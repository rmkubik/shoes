import Phaser from 'phaser';
import StateMachine from 'javascript-state-machine';

import { getCurrentEnemy, isCurrentEncounterOver, getCurrentPlayerShoe } from '../state/map';
import Button from '../prefabs/button';
import Turns from '../objects/turns';

class battleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'battle' });
  }

  create() {
    this.add.sprite(240, 240, 'background'); // zero centered

    const graphics = this.add.graphics({
      lineStyle: { width: 2, color: 0x000000 },
      fillStyle: { color: 0x000000, alpha: 0.5 },
    });
    const ellipse = new Phaser.Geom.Ellipse(480 - 120, 80 + 38, 128, 32); // x, y, width, height
    graphics.fillEllipseShape(ellipse);
    ellipse.setTo(120, 180 + 38, 128, 32);
    graphics.fillEllipseShape(ellipse);

    // this.add.sprite(120, 150 / 2, 'legs', 0);
    this.add.sprite(480 - 120, 80, getCurrentEnemy(this.state).imageKey).setScale(-3, 3);
    this.add.sprite(
      120,
      180,
      this.state.player.shoes[this.state.player.currentShoe].imageKey,
    ).setScale(3);

    this.turns = new Turns();

    // this.turns = new StateMachine({
    //   init: 'player',
    //   transitions: [
    //     { name: 'attack', from: 'player', to: 'playerAttacking' },
    //     { name: 'attack', from: 'enemy', to: 'enemyAttacking' },
    //     { name: 'finishAttack', from: 'playerAttacking', to: 'enemy' },
    //     { name: 'finishAttack', from: 'enemyAttacking', to: 'player' },
    //   ],
    //   methods: {
    //     onAfterFinishAttack: () => {
    //       // if battle is over
    //       // TODO: how do I get the pause and resume feature between the scenes to work???
    //       // this.scene.stop('battle');
    //       // this.actions.advanceMapIndex();
    //       if (isCurrentEncounterOver(this.state)) {
    //         this.state.currentMapIndex += 1;
    //         this.scene.start('map');
    //       }
    //     },
    //     onEnterEnemy: () => {
    //       // TODO: I cannot transition between states while entering a state...(ideally this.turns.attack would happen immediately, and an animation would play)
    //       this.time.delayedCall(500, () => {
    //         console.log('enemy attacks!');
    //         this.turns.attack();
    //         this.turns.finishAttack();
    //       });
    //     },
    //   },
    // });

    const moves = this.state.player.shoes[this.state.player.currentShoe].moves.map(move => move.name);

    const grid = {
      x: 160,
      y: 310,
      spacing: {
        x: 20,
        y: 15,
      },
      button: {
        height: 40,
        width: 140,
      },
      columns: 2,
    };

    this.buttons = [];
    moves.forEach((move, index) => {
      this.buttons.push(new Button({
        scene: this,
        position: {
          x: grid.x + ((grid.spacing.x + grid.button.width) * Math.floor(index % grid.columns)),
          y: grid.y + ((grid.spacing.y + grid.button.height) * Math.floor(index / grid.columns)),
        },
        sheet: 'buttons',
        sprites: {
          up: 0,
          hover: 1,
          down: 2,
        },
        onclick: () => { this.attack(index); },
        text: move,
      }));
    });
  }

  attack(index) {
    // this.actions.attack(
    //   this.state.player.shoes[this.state.player.currentShoe].moves[index],
    //   getCurrentEnemy(this.state),
    //   1000,
    // );
    // TODO: Add state manipulation into actions like in Hyperapp
    this.state.playerAttacking = false;
    getCurrentPlayerShoe(this.state).moves[index].uses.current -= 1;
    getCurrentEnemy(this.state).hp.current -= getCurrentPlayerShoe(this.state).moves[index].damage;
    // this.turns.attack();
    // TODO: Make this await an animation end event
    this.time.delayedCall(500, () => {
      // this.turns.finishAttack();
      this.turns.nextTurn();
    });
  }

  update() {
    if (this.turns.isEnemyTurn()) {
      // take enemy turn
      getCurrentPlayerShoe(this.state).hp.current -= getCurrentEnemy(this.state).moves[0].damage;
      this.turns.nextTurn();
    }
  }
}

export default battleScene;
