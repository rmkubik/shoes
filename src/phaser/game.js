import Phaser from 'phaser';

// internal dependencies
import config from './config';
import {
  GameStateFactory,
  GameActionsFactory,
} from './plugins/gameState';
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
            key: 'GameState',
            plugin: GameStateFactory(),
            start: true,
            mapping: 'state',
          },
          {
            key: 'GameActions',
            plugin: GameActionsFactory(),
            start: true,
            mapping: 'actions',
          },
        ],
      },
      parent,
      ...config,
    });
  }
}

export default Game;
