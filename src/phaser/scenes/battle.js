import Phaser from 'phaser';
import StateMachine from 'javascript-state-machine';

import { getCurrentEnemy, isCurrentEncounterOver, getCurrentPlayerShoe, getCurrentMapItem } from '../state/map';
import Button from '../prefabs/button';
import Turns from '../objects/turns';
import HpBar from '../objects/hpBar';

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
    this.enemyPosition = {
      x: 480 - 120,
      y: 80,
    };
    // negative x axis scale to mirror sprite over y axis
    this.enemySprite = this.add.sprite(this.enemyPosition.x, this.enemyPosition.y, getCurrentEnemy(this.state).imageKey).setScale(-3, 3);
    this.createEnemyHpBar(this.enemyPosition);

    this.playerPosition = {
      x: 120,
      y: 180,
    };
    this.playerSprite = this.add.sprite(
      this.playerPosition.x,
      this.playerPosition.y,
      this.state.player.shoes[this.state.player.currentShoe].imageKey,
    ).setScale(3);
    this.createPlayerHpBar(this.playerPosition);

    this.turns = new Turns();

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
    if (this.state.attacking) {
      // can't attack if something is already attacking
      return;
    }
    this.state.attacking = true;
    // TODO: Add state manipulation into actions like in Hyperapp
    getCurrentPlayerShoe(this.state).moves[index].uses.current -= 1;
    getCurrentEnemy(this.state).hp.current -= getCurrentPlayerShoe(this.state).moves[index].damage;
    this.enemyHp.takeDamage(getCurrentPlayerShoe(this.state).moves[index].damage);
    // this.turns.attack();
    // TODO: Make this await an animation end event
    this.time.delayedCall(500, () => {
      // this.turns.finishAttack();
      this.state.attacking = false;
      this.turns.nextTurn();
    });
  }

  update() {
    this.enemyHp.draw();
    this.playerHp.draw();

    if (!this.state.attacking) {
      if (isCurrentEncounterOver(this.state)) {
        // TODO: how do I get the pause and resume feature between the scenes to work???
        this.scene.start('map');
      } else if (getCurrentEnemy(this.state).hp.current <= 0) {
        // choose next enemy
        getCurrentMapItem(this.state).currentEnemyIndex += 1;
        this.enemySprite.setTexture(getCurrentEnemy(this.state).imageKey);
        this.createEnemyHpBar();
        this.turns.nextTurn();
      } else if (this.turns.isEnemyTurn()) {
        // take enemy turn
        getCurrentPlayerShoe(this.state).hp.current -= getCurrentEnemy(this.state).moves[0].damage;
        this.playerHp.takeDamage(getCurrentEnemy(this.state).moves[0].damage);
        this.state.attacking = true;
        // TODO: Make this await an animation end event
        this.time.delayedCall(500, () => {
          // this.turns.finishAttack();
          this.state.attacking = false;
          this.turns.nextTurn();
        });
      }
    }
  }

  createEnemyHpBar() {
    this.enemyHp = new HpBar({
      scene: this,
      position: {
        x: this.enemyPosition.x,
        y: this.enemyPosition.y + 50,
      },
      hp: getCurrentEnemy(this.state).hp,
    });
  }

  createPlayerHpBar() {
    this.playerHp = new HpBar({
      scene: this,
      position: {
        x: this.playerPosition.x,
        y: this.playerPosition.y + 50,
      },
      hp: getCurrentPlayerShoe(this.state).hp,
    });
  }
}

export default battleScene;
