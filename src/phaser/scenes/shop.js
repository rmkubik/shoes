import Phaser from 'phaser';

import { getCurrentMapItem } from '../state/map';
import ButtonGrid from '../prefabs/buttonGrid';

class ShopScene extends Phaser.Scene {
  constructor() {
    super({ key: 'shop' });
  }

  create() {
    this.add.sprite(240, 240, 'shopBackground'); // zero centered

    this.moneyTemplate = money => `Money: $${money}`;
    this.moneyText = this.add.text(32, 32, this.moneyTemplate(this.state.player.money), {
      fontFamily: 'Arial',
      fontSize: 16,
      color: '#FFFFFF',
    });

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
          getCurrentMapItem(this.state).finished = true;
          this.scene.stop('shop');
          this.scene.wake('map');
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
        if (this.state.player.money >= item.cost) {
          if (!this.state.player.items[item.key]) {
            this.state.player.items[item.key] = 0;
          }
          this.state.player.items[item.key] += 1;
          this.state.player.money -= item.cost;
          this.moneyText.setText(this.moneyTemplate(this.state.player.money));
        }
      },
    }));
  }
}

export default ShopScene;
