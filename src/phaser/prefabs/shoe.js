import Phaser from 'phaser';

import HpBar from '../objects/hpBar';

class Shoe {
  constructor({
    scene, position, direction = 1, key, scale = 3, state,
  }) {
    this.position = position;
    this.state = state;

    this.shadow = scene.add.graphics({
      fillStyle: { color: 0x000000, alpha: 0.5 },
    });
    const shadow = {
      width: 128,
      height: 32,
      offset: 22,
    };
    const shadowPattern = new Phaser.Geom.Ellipse(
      this.position.x,
      this.position.y + (shadow.height / 2) + shadow.offset,
      shadow.width,
      shadow.height,
    );
    this.shadow.fillEllipseShape(shadowPattern);

    this.sprite = scene.add.sprite(
      this.position.x,
      this.position.y,
      key,
    ).setScale(scale * direction, scale);

    const hpOffset = 50;
    this.hpBar = new HpBar({
      scene,
      position: {
        x: this.position.x,
        y: this.position.y + hpOffset,
      },
      hp: this.state.hp,
    });
    this.hpBar.draw();
  }

  takeDamage(damage) {
    this.state.hp.current -= damage;
    this.hpBar.takeDamage(damage);
    this.hpBar.draw();
  }

  destroy() {
    this.sprite.destroy();
    this.hpBar.destroy();
    this.shadow.destroy();
  }
}

export default Shoe;
