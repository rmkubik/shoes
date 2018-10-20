import StateMachine from 'javascript-state-machine';

import Prefab from './prefab';

class Button extends Prefab {
  constructor({
    scene, position, sheet, sprites, onclick = () => {}, text = '',
  }) {
    super({
      scene, position, sheet, sprite: sprites.up,
    });

    this.text = scene.add.text(position.x + 5, position.y + 5, text, {
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
        onEnterHover: () => { this.setFrame(sprites.hover); },
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
}

export default Button;
