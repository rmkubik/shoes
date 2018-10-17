import Phaser from 'phaser';

// internal dependencies
import Player from '../prefabs/player';
import Map from '../map';
import BattleTransitionPipeline from '../pipelines/BattleTransitionPipeline';

class mapScene extends Phaser.Scene {
  constructor() {
    super({ key: 'map' });
  }

  create() {
    this.transitioning = false;
    this.startBattleTransition = () => {
      if (!this.transitioning) {
        this.t = 0;
        this.customPipeline.setFloat1('time', this.t);
        this.cameras.main.setRenderToTexture(this.customPipeline);
        this.transitioning = true;
        this.time.delayedCall(1000, () => {
          this.scene.pause();
          this.actions.changeScene({ newScene: 'BattleScene' });
          this.scene.start('battle');
          this.transitioning = false;
        });
        // this.cameras.main.clearRenderToTexture();
        // this.cameras.main.fade(800, 0, 0, 0);
      }
    };

    const map = new Map({
      scene: this,
      tilesets: [
        {
          tiledName: 'roguelikeChar_transparent',
          tileSetKey: 'characters',
          spacing: 1,
        },
        {
          tiledName: 'roguelikeSheet_transparent',
          tileSetKey: 'tiles',
          margin: 1,
          spacing: 3,
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

    this.cameras.main.startFollow(player, true);
    this.cameras.main.setBounds(0, 0, map.tilemap.widthInPixels, map.tilemap.heightInPixels);
    this.cameras.main.setSize(480, 480);

    this.physics.world.setBounds(120, 0, 240, 100 * 16); // height is number of tiles in map * tile size
    this.physics.add.collider(player, map.layers.objects);
    this.objects.add(player);

    this.customPipeline = this.game.renderer.addPipeline('BattleTransition', new BattleTransitionPipeline(this.game));

    this.input.keyboard.on('keydown_W', () => { this.scene.start('battle'); });
    // this.input.keyboard.on('keydown_A', () => { prefab.x -= speed; });
    // this.input.keyboard.on('keydown_S', () => { prefab.y += speed; });
    // this.input.keyboard.on('keydown_D', () => { prefab.x += speed; });
  }

  update() {
    if (this.transitioning) {
      this.customPipeline.setFloat1('time', this.t);
      this.t += 0.005;
    }

    if (this.state.scene.current === 'MapScene') {
      this.scene.resume('mapScene');
    }
  }
}

export default mapScene;