import StateMachine from 'javascript-state-machine';

class HpBar {
  constructor({
    scene, position, hp: { current, max },
  }) {
    this.current = current;
    this.max = max;
    this.position = position;

    this.graphics = scene.add.graphics();

    this.text = scene.add.text(
      position.x + 45,
      position.y,
      this.current,
      {
        fontFamily: 'Arial',
        fontSize: 16,
        color: '#FFFFFF',
      },
    );
  }

  takeDamage(damage) {
    this.current -= damage;
    this.text.setText(this.current);
  }

  heal(amount) {
    this.current += amount;
    this.text.setText(this.current);
  }

  draw() {
    // background
    this.graphics.fillStyle(0x000000);
    this.graphics.fillRect(this.position.x - 40, this.position.y, 80, 16);

    const maxWidth = 76;
    let percentage = this.current / this.max;
    if (percentage < 0) {
      percentage = 0;
    }
    const currentHealthWidth = Math.floor(percentage * maxWidth);

    // health
    this.graphics.fillStyle(0x00ff00);
    this.graphics.fillRect((this.position.x + 2) - 40, this.position.y + 2, currentHealthWidth, 12);
  }

  destroy() {
    this.graphics.destroy();
    this.text.destroy();
  }
}

export default HpBar;
