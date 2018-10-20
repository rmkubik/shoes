import Phaser from 'phaser';
import state from '../state/index';
import actions from '../actions/index';

class GameState extends Phaser.Plugins.BasePlugin {}

export function GameStateFactory() {
  Object.assign(GameState.prototype, state);

  return GameState;
}

class GameAction extends Phaser.Plugins.BasePlugin {}

export function GameActionsFactory() {
  Object.assign(GameAction.prototype, actions);

  return GameAction;
}
