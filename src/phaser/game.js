import Phaser from 'phaser';

// internal dependencies
import config from './config';
import {
  HyperappActionsFactory,
  HyperappStateFactory,
} from './plugins/hyperapp';
import Player from './prefabs/player';
import Map from './map';
import { generateArrayFromInclusive } from '../helpers';

// assets
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
  const map = new Map({
    scene: this,
    key: 'map',
    tilesets: [
      {
        tiledName: 'roguelikeSheet_transparent',
        tileSetKey: 'tiles',
      },
    ],
    layers: [
      {
        tiledName: 'base',
        tileSetKey: 'tiles',
      },
      {
        tiledName: 'sceneryLower',
        tileSetKey: 'tiles',
      },
      {
        tiledName: 'objects',
        tileSetKey: 'tiles',
      },
      {
        tiledName: 'sceneryUpper',
        tileSetKey: 'tiles',
      },
    ],
  });

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

  this.physics.add.collider(player, map.layers.objects);
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
