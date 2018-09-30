import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  width: 240,
  height: 480,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  pixelArt: false,
};
