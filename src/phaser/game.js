import Phaser from 'phaser';

import config from './config';
import {
  HyperappActionsFactory,
  HyperappStateFactory,
} from './plugins/hyperapp';
import Prefab from './prefabs/prefab';
import Player from './prefabs/player';
import { generateArrayFromInclusive } from '../helpers';

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
  const sceneryUpperLayer = map.createStaticLayer('sceneryUpper', tiles, 0, 0);

  // 1356 is index of fence gate from Tiled (phaser seems to be +1)
  // 1765 is index of final index in tilesheet
  objectsLayer.setCollision([
    ...generateArrayFromInclusive(0, 1356),
    ...generateArrayFromInclusive(1358, 1765),
  ]);

  // const debugGraphics = this.add.graphics();
  // map.renderDebug(debugGraphics, undefined, objectsLayer);

  // console.log(map.layers.find(layer => layer.name === 'objects').data);

  this.objects = this.add.group({
    runChildUpdate: true,
  });

  const keys = {
    up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
    left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
    down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
    right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
  };

  const player = new Player({
    scene: this,
    position: {
      x: 32,
      y: 32,
    },
    speed: 150,
    keys,
  });

  this.physics.add.collider(player, objectsLayer);
  this.objects.add(player);


  // this.input.keyboard.on('keydown_W', () => { prefab.y -= speed; });
  // this.input.keyboard.on('keydown_A', () => { prefab.x -= speed; });
  // this.input.keyboard.on('keydown_S', () => { prefab.y += speed; });
  // this.input.keyboard.on('keydown_D', () => { prefab.x += speed; });
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
