import { h } from 'hyperapp';

import Game from '../phaser/game';

let phaserCanvas;

export default ({ state, actions, gameParentId }) => {
  const style = {
    display: 'none',
  };

  if (state.scene.current === 'MapScene') {
    style.display = 'block';
    // resume state
  }


  return (
    <div
      key={gameParentId}
      id={gameParentId}
      style={style}
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
};
