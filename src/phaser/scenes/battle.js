import Phaser from 'phaser';
import StateMachine from 'javascript-state-machine';

import { getCurrentEnemy, isCurrentEncounterOver, getCurrentPlayerShoe, getCurrentMapItem } from '../state/map';
import Turns from '../objects/turns';
import ButtonGrid from '../prefabs/buttonGrid';
import Shoe from '../prefabs/shoe';
import Effects from '../objects/items/effects';
import ItemHelpers from '../objects/items/helpers';

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

  attack(index) {
    if (this.state.attacking) {
      // can't attack if something is already attacking
      return;
    }
    if (getCurrentPlayerShoe(this.state).hp.current <= 0) {
      // can't attack if you're dead
      return;
    }
    this.state.attacking = true;
    getCurrentPlayerShoe(this.state).moves[index].uses.current -= 1;
    this.enemy.takeDamage(getCurrentPlayerShoe(this.state).moves[index].damage);
    this.player.attack()
      .then(() => {
        this.state.attacking = false;
        this.turns.nextTurn();
      });
  }

  update() {
    if (!this.state.attacking) {
      if (isCurrentEncounterOver(this.state)) {
        // TODO: how do I get the pause and resume feature between the scenes to work???
        this.scene.start('map');
      } else if (getCurrentEnemy(this.state).hp.current <= 0) {
        // choose next enemy
        getCurrentMapItem(this.state).currentEnemyIndex += 1;

        this.enemy.destroy();
        this.enemy = this.createEnemy();

        // skip enemy's turn
        this.turns.nextTurn();
      } else if (this.turns.isEnemyTurn()) {
        // take enemy turn
        this.player.takeDamage(getCurrentEnemy(this.state).moves[0].damage);
        this.state.attacking = true;
        this.enemy.attack()
          .then(() => {
            this.state.attacking = false;
            this.turns.nextTurn();
          });
      }
    }
  }

  getShoeButtonList() {
    return this.state.player.shoes.map(shoe => ({
      text: shoe.name,
      onclick: (index) => {
        if (shoe.hp.current <= 0) {
          console.log(`Cannot put on ${shoe.name}, its dead!`);
          return;
        }
        console.log(`Put on ${shoe.name}`);
        this.state.player.currentShoe = index;
        this.player.destroy();
        this.player = this.createPlayerShoe();

        // skip player's turn
        this.turns.nextTurn();

        // update button state
        this.buttonGrid.hide();
        this.buttonGrid.show(this.getShoeButtonList());
      },
    }));
  }

  getItemButtonList() {
    return Object.keys(this.state.player.items).map((key) => {
      const item = this.state.items[key];
      return {
        text: `${item.name} - ${this.state.player.items[key]}`,
        onclick: () => {
          console.log(item.useText);
          ItemHelpers.decrementItemUse(this.state, item.key);
          Effects[item.effect].animation(this)
            .then(() => {
              Effects[item.effect].effect(this.state);

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
      onclick: (index) => {
        if (move.uses.current >= 0) {
          this.attack(index);
        } else {
          console.log('This attack is expended!');
        }

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
}

export default battleScene;
