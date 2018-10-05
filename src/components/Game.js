import { h } from 'hyperapp';

import Game from '../phaser/game';

let phaserCanvas;

export default ({ state, actions, gameParentId }) => (
  <div
    key={gameParentId}
    id={gameParentId}
    oncreate={(element) => {
      new Game(actions, state, gameParentId);

      // if (!phaserCanvas) {
      //   new Game(actions, state, gameParentId);
      //   phaserCanvas = element.querySelector('canvas');
      //   // actions.setPhaserCanvas({ phaserCanvas: element.querySelector('canvas') });
      // } else {
      //   element.appendChild(phaserCanvas);
      // }
    }}
  />
);
