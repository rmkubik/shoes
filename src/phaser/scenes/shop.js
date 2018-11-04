import Phaser from 'phaser';

import { getCurrentMapItem } from '../state/map';
import ButtonGrid from '../prefabs/buttonGrid';
import Shoe from '../prefabs/shoe';
import Effects from '../objects/items/effects';
import ItemHelpers from '../objects/items/helpers';

class ShopScene extends Phaser.Scene {
  constructor() {
    super({ key: 'shop' });
  }

  create() {
    this.add.sprite(240, 240, 'shopBackground'); // zero centered

    this.buttonGrid = new ButtonGrid({
      scene: this,
      position: { x: 160, y: 310 },
      spacing: { x: 20, y: 15 },
      buttonDimensions: { height: 40, width: 140 },
      columns: 2,
    });
    this.buttonGrid.show(this.getItemButtonList());

    const tabButtons = [
      {
        text: 'Done',
        onclick: () => {
          console.log('finished shopping!');
        },
      },
    ];
    this.tabsGrid = new ButtonGrid({
      scene: this,
      position: { x: 10, y: 310 },
      spacing: { x: 20, y: 15 },
      buttonDimensions: { height: 40, width: 140 },
      columns: 1,
    });
    this.tabsGrid.show(tabButtons);
  }

  getItemButtonList() {
    return getCurrentMapItem(this.state).items.map(item => ({
      text: `${item.name} - $${item.cost}`,
      onclick: () => {
        console.log(item.useText);
      },
    }));
  }
}

export default ShopScene;
