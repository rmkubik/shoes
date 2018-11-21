import StateMachine from 'javascript-state-machine';

import Prefab from './prefab';

class Button extends Prefab {
  constructor({
    scene, position, sheet, sprites, onclick = () => {}, text = '', description = '',
  }) {
    super({
      scene, position, sheet, sprite: sprites.up,
    });

    this.position = position;
    this.scene = scene;
    this.description = description;

    this.text = scene.add.text(position.x + 5, position.y + 5, text, {
      fontFamily: 'Arial',
      fontSize: 16,
      color: '#FFFFFF',
    });

    this.graphics = scene.add.graphics();
    this.popOverText = scene.add.text(position.x, position.y, '', {
      fontFamily: 'Arial',
      fontSize: 16,
      color: '#FFFFFF',
    });

    this.fsm = new StateMachine({
      init: 'up',
      transitions: [
        { name: 'over', from: 'up', to: 'hover' },
        { name: 'out', from: 'hover', to: 'up' },
        { name: 'out', from: 'down', to: 'up' },
        { name: 'down', from: 'hover', to: 'down' },
        { name: 'up', from: 'down', to: 'hover' },
      ],
      methods: {
        onEnterHover: () => {
          this.setFrame(sprites.hover);
          if (this.description) {
            this.showPopOver();
          }
        },
        onLeaveHover: () => {
          if (this.description) {
            this.hidePopOver();
          }
        },
        onEnterUp: () => { this.setFrame(sprites.up); },
        onEnterDown: () => { this.setFrame(sprites.down); },
        onAfterUp: () => { onclick(); },
      },
    });

    this.setInteractive();

    this.on('pointerover', () => {
      this.fsm.over();
    });

    this.on('pointerout', () => {
      this.fsm.out();
    });

    this.on('pointerdown', () => {
      this.fsm.down();
    });

    this.on('pointerup', () => {
      this.fsm.up();
    });
  }

  showPopOver() {
    this.graphics.fillStyle(0x000000);
    this.graphics.fillRect(this.position.x, this.position.y, 160, 80);
    this.popOverText.setText(this.description);
    this.scene.children.bringToTop(this.graphics);
    this.scene.children.bringToTop(this.popOverText);
  }

  hidePopOver() {
    this.graphics.clear();
    this.popOverText.setText('');
  }

  destroy() {
    this.graphics.destroy();
    this.popOverText.destroy();
    this.text.destroy();
    super.destroy();
  }
}

export default Button;
