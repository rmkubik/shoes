import Button from './button';

class Grid {
  constructor({
    scene, position, spacing, buttonDimensions, columns, buttons,
  }) {
    this.buttons = buttons.map(({ text, onclick }, index) => new Button({
      scene,
      position: {
        x: position.x + ((spacing.x + buttonDimensions.width) * Math.floor(index % columns)),
        y: position.y + ((spacing.y + buttonDimensions.height) * Math.floor(index / columns)),
      },
      sheet: 'buttons',
      sprites: {
        up: 0,
        hover: 1,
        down: 2,
      },
      onclick: () => { onclick(index); },
      text,
    }));
  }
}

export default Grid;
