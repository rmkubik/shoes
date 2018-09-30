import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  width: 768,
  height: 768,
  parent: 'Game',
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  pixelArt: false,
};
