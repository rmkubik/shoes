import Phaser from 'phaser';
import StateMachine from 'javascript-state-machine';

import { getCurrentEnemy, isCurrentEncounterOver, getCurrentPlayerShoe, getCurrentMapItem } from '../state/map';
import Turns from '../objects/turns';
import ButtonGrid from '../prefabs/buttonGrid';
import Shoe from '../prefabs/shoe';

class battleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'battle' });
  }

  create() {
    this.add.sprite(240, 240, 'background'); // zero centered

    this.enemy = this.createEnemy();

    this.player = new Shoe({
      scene: this,
      position: {
        x: 120,
        y: 180,
      },
      direction: 1,
      state: getCurrentPlayerShoe(this.state),
    });

    this.turns = new Turns();

    const moveNames = this.state.player.shoes[this.state.player.currentShoe]
      .moves.map(move => move.name);
    const moveButtons = moveNames.map(name => ({ text: name, onclick: this.attack.bind(this) }));
    this.movesGrid = new ButtonGrid({
      scene: this,
      position: { x: 160, y: 310 },
      spacing: { x: 20, y: 15 },
      buttonDimensions: { height: 40, width: 140 },
      columns: 2,
      buttons: moveButtons,
    });

    const tabButtons = [
      { text: 'Moves', onclick: console.log },
      { text: 'Items', onclick: console.log },
      { text: 'Shoes', onclick: console.log },
    ];
    this.tabsGrid = new ButtonGrid({
      scene: this,
      position: { x: 10, y: 310 },
      spacing: { x: 20, y: 15 },
      buttonDimensions: { height: 40, width: 140 },
      columns: 1,
      buttons: tabButtons,
    });
  }

  attack(index) {
    if (this.state.attacking) {
      // can't attack if something is already attacking
      return;
    }
    this.state.attacking = true;
    getCurrentPlayerShoe(this.state).moves[index].uses.current -= 1;
    this.enemy.takeDamage(getCurrentPlayerShoe(this.state).moves[index].damage);
    // TODO: Make this await an animation end event
    this.time.delayedCall(500, () => {
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
        // TODO: Make this await an animation end event
        this.time.delayedCall(500, () => {
          this.state.attacking = false;
          this.turns.nextTurn();
        });
      }
    }
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
}

export default battleScene;
