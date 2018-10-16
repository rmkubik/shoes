import Phaser from 'phaser';

// internal dependencies
import config from './config';
import {
  HyperappActionsFactory,
  HyperappStateFactory,
} from './plugins/hyperapp';
import battleScene from './scenes/battle';
import loadScene from './scenes/load';
import mapScene from './scenes/map';

class Game {
  constructor(actions, state, parent) {
    this.game = new Phaser.Game({
      scene: [loadScene, mapScene, battleScene],
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

  updateState(state) {
    console.log(state);
  }
}

export default Game;
