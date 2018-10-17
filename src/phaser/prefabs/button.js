import StateMachine from 'javascript-state-machine';

import Prefab from './prefab';

class Button extends Prefab {
  constructor({
    scene, position, sheet, sprites,
  }) {
    super({
      scene, position, sheet, sprite: sprites.up,
    });

    this.setInteractive();

    this.fsm = new StateMachine({
      init: 'up',
      transitions: [
        { name: 'over', from: 'up', to: 'hover' },
        { name: 'out', from: 'hover', to: 'up' },
        { name: 'down', from: 'hover', to: 'down' },
        { name: 'up', from: 'down', to: 'hover' },
      ],
      methods: {
        onEnterHover: () => { this.setFrame(sprites.hover); },
        onEnterUp: () => { this.setFrame(sprites.up); },
        onEnterDown: () => { this.setFrame(sprites.down); },
      },
    });

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
