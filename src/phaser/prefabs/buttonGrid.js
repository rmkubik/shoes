import Button from './button';

class ButtonGrid {
  constructor({
    scene, position, spacing, buttonDimensions, columns,
  }) {
    this.scene = scene;
    this.position = position;
    this.spacing = spacing;
    this.buttonDimensions = buttonDimensions;
    this.columns = columns;
  }

  show(buttons) {
    this.buttons = buttons.map(({ text, onclick }, index) => new Button({
      scene: this.scene,
      position: {
        x: this.position.x + (
          (this.spacing.x + this.buttonDimensions.width) * Math.floor(index % this.columns)
        ),
        y: this.position.y + (
          (this.spacing.y + this.buttonDimensions.height) * Math.floor(index / this.columns)
        ),
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

  hide() {
    this.buttons.forEach((button) => {
      button.destroy();
    });
  }
}

export default ButtonGrid;
