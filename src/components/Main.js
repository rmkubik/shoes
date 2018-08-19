import { h } from 'hyperapp';

import BattleScene from './BattleScene';

export default (state, actions) => (
  <div class="main">
    <BattleScene state={state} actions={actions} />
  </div>
);
