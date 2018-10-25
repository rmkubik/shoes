import Phaser from 'phaser';
import state from '../state/index';
import actions from '../actions/index';

class GameState extends Phaser.Plugins.BasePlugin {}

export function GameStateFactory() {
  Object.assign(GameState.prototype, JSON.parse(JSON.stringify(state)));

  return GameState;
}

class GameAction extends Phaser.Plugins.BasePlugin {}

export function GameActionsFactory() {
  const wiredActions = Object.entries(actions).reduce((statefulActions, [key, action]) => {
    statefulActions[key] = action(state);
    return statefulActions;
  }, {});
  Object.assign(GameAction.prototype, wiredActions);

  return GameAction;
}
