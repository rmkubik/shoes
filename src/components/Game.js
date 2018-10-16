import { h } from 'hyperapp';

import Game from '../phaser/game';

let game;

export default ({ state, actions, gameParentId }) => {
  if (game) {
    game.updateState(state);
  }

  return (
    <div
      key={gameParentId}
      id={gameParentId}
      oncreate={() => {
        game = new Game(actions, state, gameParentId);
      }}
    />
  );
};
