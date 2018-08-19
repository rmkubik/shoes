import { h } from 'hyperapp';

import BattleScene from './BattleScene';
import MapScene from './MapScene';

const sceneMap = {
  BattleScene: (state, actions) => <BattleScene state={state} actions={actions} />,
  MapScene: (state, actions) => <MapScene state={state} actions={actions} />,
};

export default (state, actions) => (
  <div class="main">{sceneMap[state.scene.current](state, actions)}</div>
);
