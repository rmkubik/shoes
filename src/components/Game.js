import { h } from 'hyperapp';

import Game from '../phaser/game';

export default ({ state, actions, gameParentId }) => {
  const game = new Game(actions, state, gameParentId);

  return <div class={gameParentId}></div>;
};
