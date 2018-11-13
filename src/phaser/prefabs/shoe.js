import Phaser from 'phaser';

import HpBar from '../objects/hpBar';

class Shoe {
  constructor({
    scene, position, direction = 1, scale = 3, state,
  }) {
    this.scene = scene;
    this.position = position;
    this.state = state;
    this.direction = direction;

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
      this.state.imageKey,
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

    this.statTextTemplate = stats => `Atk: ${stats.attack.current}
Def: ${stats.defense.current}`;

    this.statText = scene.add.text(
      position.x - 25,
      position.y + 68,
      this.statTextTemplate(this.state.stats),
      {
        fontFamily: 'Arial',
        fontSize: 16,
        color: '#FFFFFF',
      },
    );
  }

  attack() {
    return new Promise((resolve) => {
      this.scene.tweens.add({
        targets: this.sprite,
        x: this.position.x + (this.direction * 30),
        ease: 'Power1',
        duration: 250,
        yoyo: true,

        onComplete: () => {
          resolve();
        },
      });
    });
  }

  unEquipShoe() {
    return new Promise((resolve) => {
      this.scene.tweens.add({
        targets: this.sprite,
        x: this.position.x + (-1 * this.direction * 160),
        ease: 'Power1',
        duration: 250,

        onComplete: () => {
          resolve();
        },
      });
    });
  }

  equipShoe() {
    return new Promise((resolve) => {
      this.sprite.x = this.direction > 0 ? -160 : 480 + 160;
      this.scene.tweens.add({
        targets: this.sprite,
        x: this.position.x,
        ease: 'Power1',
        duration: 250,

        onComplete: () => {
          resolve();
        },
      });
    });
  }

  takeDamage(damage) {
    this.state.hp.current -= damage;
    this.hpBar.takeDamage(damage);
    this.hpBar.draw();
  }

  heal(amount = (this.state.hp.max - this.state.hp.current)) {
    this.state.hp.current += amount;
    this.hpBar.heal(amount);
    this.hpBar.draw();
  }

  destroy() {
    this.sprite.destroy();
    this.hpBar.destroy();
    this.shadow.destroy();
    this.statText.destroy();
  }

  adjustStat(stat, amount) {
    this.state.stats[stat].current += amount;
    this.statText.setText(this.statTextTemplate(this.state.stats));
  }
}

export default Shoe;
