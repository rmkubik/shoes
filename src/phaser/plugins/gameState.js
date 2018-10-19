import Phaser from 'phaser';
import state from '../state/index';

class GameState extends Phaser.Plugins.BasePlugin {}

export default function GameStateFactory() {
  Object.assign(GameState.prototype, state);

  return GameState;
}
