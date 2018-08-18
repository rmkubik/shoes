import { h } from 'hyperapp';

import Buttons from './Buttons';
import Screen from './Screen';

export default (state, actions) => (
  <div class="main">
    <Screen playerAttacking={state.playerAttacking} playerStopAttack={actions.playerStopAttack} />
    <Buttons playerAttack={actions.playerAttack} />
  </div>
);
