import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  width: 480,
  height: 480,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  pixelArt: true,
  backgroundColor: '#000000',
};
