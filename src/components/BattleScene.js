import { h } from 'hyperapp';

import Buttons from './Buttons';
import Screen from './Screen';

export default ({ state, actions }) => {
  const { enemy } = state.map[state.currentMapIndex];
  return (
    <div class="battleScene">
      <Screen
        playerAttacking={state.playerAttacking}
        playerStopAttack={actions.playerStopAttack}
        shoes={{
          player: state.player.shoes[state.player.currentShoe],
          enemy,
        }}
      />
      <Buttons
        playerAttack={actions.playerAttack}
        moves={state.player.shoes[state.player.currentShoe].moves}
      />
    </div>
  );
};
