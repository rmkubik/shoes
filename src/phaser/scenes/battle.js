import Phaser from 'phaser';

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

class battleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'battle' });
  }

  preload() {
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
  }

  create() {
    this.add.sprite(240 - 64, 120, 'sandal').setScale(2);
    this.add.sprite(64, 360, 'boot').setScale(2);
  }

  update() {

  }
}

export default battleScene;