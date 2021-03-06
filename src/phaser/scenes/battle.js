import Phaser from 'phaser';
import StateMachine from 'javascript-state-machine';

import { getCurrentEnemy, isCurrentEncounterOver, getCurrentPlayerShoe, getCurrentMapItem } from '../state/map';
import Turns from '../objects/turns';
import ButtonGrid from '../prefabs/buttonGrid';
import Shoe from '../prefabs/shoe';
import Effects from '../objects/items/effects';
import ItemHelpers from '../objects/items/helpers';
import Moves from '../objects/moves/moves';
import { pickRandomlyFromArray } from '../../helpers';
import items from '../state/items';


class battleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'battle' });
  }

  create() {
    this.add.sprite(240, 240, 'background'); // zero centered

    this.enemy = this.createEnemy();

    this.player = this.createPlayerShoe();

    this.turns = new Turns();

    this.buttonGrid = new ButtonGrid({
      scene: this,
      position: { x: 160, y: 310 },
      spacing: { x: 20, y: 15 },
      buttonDimensions: { height: 40, width: 140 },
      columns: 2,
    });
    this.buttonGrid.show(this.getMoveButtonList());


    const tabButtons = [
      {
        text: 'Moves',
        onclick: () => {
          this.buttonGrid.hide();
          this.buttonGrid.show(this.getMoveButtonList());
        },
      },
      {
        text: 'Items',
        onclick: () => {
          this.buttonGrid.hide();
          this.buttonGrid.show(this.getItemButtonList());
        },
      },
      {
        text: 'Shoes',
        onclick: () => {
          this.buttonGrid.hide();
          this.buttonGrid.show(this.getShoeButtonList());
        },
      },
    ];
    this.tabsGrid = new ButtonGrid({
      scene: this,
      position: { x: 10, y: 310 },
      spacing: { x: 20, y: 15 },
      buttonDimensions: { height: 40, width: 140 },
      columns: 1,
    });
    this.tabsGrid.show(tabButtons);
  }

  attack(attacker, target, move) {
    if (this.state.acting) {
      // can't attack if something is already acting
      return;
    }
    if (getCurrentPlayerShoe(this.state).hp.current <= 0) {
      // can't attack if you're dead
      return;
    }

    if (move.uses.current <= 0) {
      console.log('This move is all used up!');
      return;
    }

    this.state.acting = true;
    move.uses.current -= 1;

    // TODO: make effect happen before animation resolves, may change this...
    Moves[move.effect].effect(attacker, move.target === 'self' ? attacker : target, move);
    Moves[move.effect].animation(attacker)
      .then(() => {
        this.state.acting = false;
        this.turns.nextTurn();
      });
  }

  update() {
    if (!this.state.acting) {
      if (isCurrentEncounterOver(this.state)) {
        this.state.acting = true;

        this.gainItem(pickRandomlyFromArray([items.shoeBox, items.shoeRepairKit]))
          .then(() => {
            Promise.all([this.player.unEquipShoe(), this.enemy.unEquipShoe()])
              .then(() => {
                ItemHelpers.resetAllPlayerShoeStatsToBaseAmount(this.state);
                this.state.acting = false;
                this.scene.stop('battle');
                this.scene.wake('map');
              });
          });
      } else if (getCurrentEnemy(this.state).hp.current <= 0) {
        this.state.acting = true;
        this.enemy.unEquipShoe()
          .then(() => {
            // choose next enemy
            getCurrentMapItem(this.state).currentEnemyIndex += 1;

            this.enemy.destroy();
            this.enemy = this.createEnemy();

            return this.enemy.equipShoe();
          })
          .then(() => {
            this.state.acting = false;
            // skip enemy's turn
            this.turns.nextTurn();
          });
      } else if (this.turns.isEnemyTurn()) {
        // take enemy turn
        this.attack(this.enemy, this.player, getCurrentEnemy(this.state).moves[0]);
      }
    }
  }

  getShoeButtonList() {
    return this.state.player.shoes.map(shoe => ({
      text: shoe.name,
      description: shoe.description,
      onclick: (index) => {
        if (shoe.hp.current <= 0) {
          console.log(`Cannot put on ${shoe.name}, its dead!`);
          return;
        }

        if (this.state.player.currentShoe === index) {
          console.log(`Already wearing ${shoe.name}!`);
          return;
        }

        const originalShoe = getCurrentPlayerShoe(this.state);

        this.player.unEquipShoe()
          .then(() => {
            console.log(`Put on ${shoe.name}`);
            this.state.player.currentShoe = index;
            this.player.destroy();
            this.player = this.createPlayerShoe();

            return this.player.equipShoe();
          })
          .then(() => {
            // skip player's turn if old shoe was alive
            if (originalShoe.hp.current > 0) {
              this.turns.nextTurn();
            }

            // update button state
            this.buttonGrid.hide();
            this.buttonGrid.show(this.getShoeButtonList());
          });
      },
    }));
  }

  getItemButtonList() {
    return Object.keys(this.state.player.items).map((key) => {
      const item = this.state.items[key];
      return {
        text: `${item.name} - ${this.state.player.items[key]}`,
        description: item.description,
        onclick: () => {
          console.log(item.useText);
          ItemHelpers.decrementItemUse(this.state, item.key);
          Effects[item.effect].animation(this)
            .then(() => {
              Effects[item.effect].effect(this, item);

              if (this.state.player.items[key] <= 0) {
                delete this.state.player.items[key];
              }

              // update button state
              this.buttonGrid.hide();
              this.buttonGrid.show(this.getItemButtonList());
            });
        },
      };
    });
  }

  getMoveButtonList() {
    return this.state.player.shoes[this.state.player.currentShoe].moves.map(move => ({
      text: `${move.name} - ${move.uses.current}/${move.uses.max}`,
      description: move.description,
      onclick: () => {
        this.attack(this.player, this.enemy, move);

        // update button state
        this.buttonGrid.hide();
        this.buttonGrid.show(this.getMoveButtonList());
      },
    }));
  }

  createEnemy() {
    return new Shoe({
      scene: this,
      position: {
        x: 480 - 120,
        y: 80,
      },
      direction: -1,
      state: getCurrentEnemy(this.state),
    });
  }

  createPlayerShoe() {
    return new Shoe({
      scene: this,
      position: {
        x: 120,
        y: 180,
      },
      direction: 1,
      state: getCurrentPlayerShoe(this.state),
    });
  }

  gainItem(item) {
    const onComplete = new Promise((resolve) => {
      const itemImage = this.add.image(320, 80, 'items', item.frame);
      this.tweens.add({
        targets: itemImage,
        x: 160,
        y: 280,
        ease: 'Power1',
        duration: 750,
        onComplete: () => {
          ItemHelpers.incrementItemUse(this.state, item.key);
          itemImage.destroy();
          resolve();
        },
      });
    });
    return onComplete;
  }
}

export default battleScene;
