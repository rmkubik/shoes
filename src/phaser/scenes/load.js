import Phaser from 'phaser';

// tilesheets
import characterSheet from '../../../assets/spritesheets/roguelikeChar_transparent.png';
import tileSheet from '../../../assets/spritesheets/roguelikeSheet_transparent.png';

// tilemaps
import tiledMap from '../../../assets/tilemaps/main.json';
import houseMap from '../../../assets/tilemaps/house.json';
import clearingMap from '../../../assets/tilemaps/clearing.json';
import clearing2Map from '../../../assets/tilemaps/clearing2.json';

import bootImage from '../../../assets/images/shoes_0.png';
import highHeelImage from '../../../assets/images/shoes_1.png';
import crocImage from '../../../assets/images/shoes_2.png';
import cowboyImage from '../../../assets/images/shoes_3.png';
import cleatImage from '../../../assets/images/shoes_4.png';
import slipperImage from '../../../assets/images/shoes_5.png';
import clownImage from '../../../assets/images/shoes_6.png';
import flatsImage from '../../../assets/images/shoes_7.png';
import sandalImage from '../../../assets/images/shoes_8.png';
import sneakerImage from '../../../assets/images/shoes_9.png';
import backgroundImage from '../../../assets/images/background.png';

class loadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'load' });
  }

  preload() {
    this.load.spritesheet('characters', characterSheet, {
      frameWidth: 16,
      frameHeight: 16,
      spacing: 1,
    });
    this.load.spritesheet('tiles', tileSheet, {
      frameWidth: 16,
      frameHeight: 16,
      spacing: 3,
      margin: 1,
    });

    this.load.tilemapTiledJSON('map', tiledMap);
    this.load.tilemapTiledJSON('house', houseMap);
    this.load.tilemapTiledJSON('clearing', clearingMap);
    this.load.tilemapTiledJSON('clearing2', clearing2Map);

    this.load.image('boot', bootImage);
    this.load.image('highHeel', highHeelImage);
    this.load.image('croc', crocImage);
    this.load.image('cowboy', cowboyImage);
    this.load.image('cleat', cleatImage);
    this.load.image('slipper', slipperImage);
    this.load.image('clown', clownImage);
    this.load.image('flats', flatsImage);
    this.load.image('sandal', sandalImage);
    this.load.image('sneaker', sneakerImage);
    this.load.image('background', backgroundImage);
  }

  create() {
    this.scene.start('map');
  }
}

export default loadScene;