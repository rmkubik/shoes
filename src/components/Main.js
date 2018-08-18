import { h } from 'hyperapp';

import Buttons from './Buttons';
import Screen from './Screen';

export default (state, actions) => (
  <div class="main">
    <Screen
      playerAttacking={state.playerAttacking}
      playerStopAttack={actions.playerStopAttack}
      shoes={{
        player: state.player.shoes[state.player.currentShoe],
        enemy: state.shoes.boot,
      }}
    />
    <Buttons
      playerAttack={actions.playerAttack}
      moves={state.player.shoes[state.player.currentShoe].moves}
    />
  </div>
);
