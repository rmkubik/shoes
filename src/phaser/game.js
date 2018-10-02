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

  objectsLayer.setCollisionBetween(0, 1765); // number of tiles in tiles spritesheet, TODO: dynamically calculate

  console.log(map.layers.find(layer => layer.name === 'objects').data);

  this.objects = this.add.group({
    runChildUpdate: true,
  });

  this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
  this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
  this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
  this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

  const speed = 200;

  const prefab = new Prefab({
    scene: this,
    position: {
      x: 32,
      y: 32,
    },
    sheet: 'characters',
    sprite: 0,
  });

  prefab.speed = speed;

  prefab.update = () => {
    const direction = { x: 0, y: 0 };
    prefab.body.setVelocity(0);

    if (this.wKey.isDown) {
      direction.y = -1;
    }
    if (this.aKey.isDown) {
      direction.x = -1;
    }
    if (this.sKey.isDown) {
      direction.y = 1;
    }
    if (this.dKey.isDown) {
      direction.x = 1;
    }

    if (direction.x !== 0 || direction.y !== 0) {
      prefab.direction = direction;

      prefab.body.setVelocityX(prefab.speed * prefab.direction.x);
      prefab.body.setVelocityY(prefab.speed * prefab.direction.y);

      // console.log(prefab.direction);
      // console.log(prefab.body.velocity);
      // console.log(prefab.speed);
    }
  };

  this.physics.add.collider(prefab, objectsLayer);
  prefab.body.setCollideWorldBounds(true);

  this.objects.add(prefab);


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
