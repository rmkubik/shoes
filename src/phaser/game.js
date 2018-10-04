import Phaser from 'phaser';

// internal dependencies
import config from './config';
import {
  HyperappActionsFactory,
  HyperappStateFactory,
} from './plugins/hyperapp';
import Player from './prefabs/player';
import Map from './map';
import BattleTransitionPipeline from './pipelines/BattleTransitionPipeline';

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
  this.transitioning = false;
  this.startBattleTransition = () => {
    if (!this.transitioning) {
      this.t = 0;
      this.customPipeline.setFloat1('time', this.t);
      this.cameras.main.setRenderToTexture(this.customPipeline);
      this.transitioning = true;
      // this.cameras.main.clearRenderToTexture();
      // this.cameras.main.fade(800, 0, 0, 0);
    }
  };

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

  this.customPipeline = this.game.renderer.addPipeline('BattleTransition', new BattleTransitionPipeline(this.game));

  // this.input.keyboard.on('keydown_W', () => { prefab.y -= speed; });
  // this.input.keyboard.on('keydown_A', () => { prefab.x -= speed; });
  // this.input.keyboard.on('keydown_S', () => { prefab.y += speed; });
  // this.input.keyboard.on('keydown_D', () => { prefab.x += speed; });
}

function update() {
  if (this.transitioning) {
    this.customPipeline.setFloat1('time', this.t);
    this.t += 0.005;
  }
}

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
