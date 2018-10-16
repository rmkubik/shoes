import Phaser from 'phaser';

import { getCurrentEnemy } from '../../state/map';

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

    this.add.sprite(480 - 120, 80, getCurrentEnemy(this.state).imageKey).setScale(-3, 3);
    this.add.sprite(
      120,
      180,
      this.state.player.shoes[this.state.player.currentShoe].imageKey,
    ).setScale(3);

    this.input.keyboard.on('keydown_Q', () => { this.actions.playerStopAttack(); });
  }

  update() {

  }
}

export default battleScene;
