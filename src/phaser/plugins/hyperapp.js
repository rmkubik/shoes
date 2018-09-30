import Phaser from 'phaser';

class HyperappActions extends Phaser.Plugins.BasePlugin {}

export function HyperappActionsFactory(actions) {
  Object.assign(HyperappActions.prototype, actions);

  return HyperappActions;
}

class HyperappState extends Phaser.Plugins.BasePlugin {
  update(state) {
    Object.assign(this, state);
  }
}

export function HyperappStateFactory(state) {
  Object.assign(HyperappState.prototype, state);

  return HyperappState;
