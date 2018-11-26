import Phaser from 'phaser';

// internal dependencies
import Player from '../prefabs/player';
import Map from '../objects/map';
import BattleTransitionPipeline from '../pipelines/BattleTransitionPipeline';

import { isCurrentEncounterOver } from '../state/map';

class MapScene extends Phaser.Scene {
  constructor() {
    super({ key: 'map' });
  }

  create() {
    this.objects = this.add.group({
      runChildUpdate: true,
    });

    this.transitioning = false;

    this.events.on('wake', () => {
      this.player.unFreeze();
      this.transitioning = false;
      this.cameras.main.clearRenderToTexture();
    });

    const keys = {
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
    };

    this.player = new Player({
      scene: this,
      position: {
        x: 32,
        y: 32,
      },
      speed: 150,
      keys,
    });

    this.map = new Map({
      scene: this,
      tilesets: [
        {
          tiledName: 'characters',
          tileSetKey: 'characters',
          spacing: 1,
        },
        {
          tiledName: 'tiles',
          tileSetKey: 'tiles',
          margin: 1,
          spacing: 1,
          gid: 1,
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

    this.children.bringToTop(this.player);

    this.cameras.main.startFollow(this.player, true);
    this.cameras.main.setBounds(0, 0, this.map.tilemap.widthInPixels, this.map.tilemap.heightInPixels);
    this.cameras.main.setSize(480, 480);

    this.physics.world.setBounds(
      0,
      0,
      480,
      100 * 16, // height is number of tiles in map * tile size
    );
    this.physics.add.collider(this.player, this.map.layers.objects);
    this.objects.add(this.player);

    this.customPipeline = this.game.renderer.addPipeline('BattleTransition', new BattleTransitionPipeline(this.game));

    // this.input.keyboard.on('keydown_W', () => { this.scene.start('battle'); });
    // this.input.keyboard.on('keydown_A', () => { prefab.x -= speed; });
    // this.input.keyboard.on('keydown_S', () => { prefab.y += speed; });
    // this.input.keyboard.on('keydown_D', () => { prefab.x += speed; });
  }

  update() {
    if (this.transitioning) {
      this.customPipeline.setFloat1('time', this.t);
      this.t += 0.005;
    }

    this.state.currentMapIndex = this.map.getMapIndex(this.player);
  }

  sceneTransition(key) {
    // this.transitioning to debounce
    if (
      !this.transitioning
      && !isCurrentEncounterOver(this.state)
    ) {
      this.player.freeze();
      this.t = 0;
      this.customPipeline.setFloat1('time', this.t);
      this.cameras.main.setRenderToTexture(this.customPipeline);
      this.transitioning = true;
      this.time.delayedCall(1000, () => {
        this.scene.sleep('map');
        this.scene.launch(key);
      });
      // this.cameras.main.fade(800, 0, 0, 0);
    }

    return true;
  }
}

export default MapScene;
