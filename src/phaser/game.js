import Phaser from 'phaser';

import config from './config';
import {
  HyperappActionsFactory,
  HyperappStateFactory,
} from './plugins/hyperapp';
import Prefab from './prefab';

import characters from '../../assets/spritesheets/roguelikeChar_transparent.png';
import tiles from '../../assets/spritesheets/roguelikeSheet_transparent.png';

function preload() {
  this.load.spritesheet('characters', characters, {
    frameWidth: 16,
    frameHeight: 16,
    spacing: 1,
  });
  this.load.spritesheet('tiles', tiles, {
    frameWidth: 16,
    frameHeight: 16,
    spacing: 1,
  });
}

function create() {
  const prefab = new Prefab({
    scene: this,
    position: {
      x: 32,
      y: 32,
    },
    sheet: 'characters',
    sprite: 0,
  });
}

function update() {}

class Game {
  constructor(actions, state, parent) {
    this.game = new Phaser.Game({
      scene: {
        preload,
        create,
        update,
      },
      plugins: {
        global: [
          {
            key: 'HyperappActions',
            plugin: HyperappActionsFactory(actions),
            start: false,
            mapping: 'actions',
          },
          {
            key: 'HyperappState',
            plugin: HyperappStateFactory(state),
            start: false,
            mapping: 'state',
          },
        ],
      },
      parent,
      ...config,
    });
  }
}

export default Game;
