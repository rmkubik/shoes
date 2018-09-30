import Phaser from 'phaser';

import config from './config';
import {
  HyperappActionsFactory,
  HyperappStateFactory,
} from './plugins/hyperapp';
import Prefab from './prefab';

import characterSheet from '../../assets/spritesheets/roguelikeChar_transparent.png';
import tileSheet from '../../assets/spritesheets/roguelikeSheet_transparent.png';
import tiledMap from '../../rawAssets/tilemaps/main.json';

function preload() {
  this.load.spritesheet('characters', characterSheet, {
    frameWidth: 16,
    frameHeight: 16,
    spacing: 1,
  });
  this.load.spritesheet('tiles', tileSheet, {
    frameWidth: 16,
    frameHeight: 16,
    spacing: 1,
  });
  this.load.tilemapTiledJSON('map', tiledMap);
}

function create() {
  const map = this.make.tilemap({ key: 'map' });
  const tiles = map.addTilesetImage('roguelikeSheet_transparent', 'tiles');
  const baseLayer = map.createStaticLayer('base', tiles, 0, 0);
  const sceneryLowerLayer = map.createStaticLayer('sceneryLower', tiles, 0, 0);
  const objectsLayer = map.createStaticLayer('objects', tiles, 0, 0);

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
