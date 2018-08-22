import { h } from 'hyperapp';

import BattleScene from './BattleScene';
import MapScene from './MapScene';
import ShopScene from './ShopScene';
// import { isAlive } from '../state/shoes';
// import { getCurrentEnemy, getNextEnemyIndex } from '../state/map';

const sceneMap = {
  BattleScene: (state, actions) => <BattleScene state={state} actions={actions} />,
  MapScene: (state, actions) => <MapScene state={state} actions={actions} />,
  ShopScene: (state, actions) => <ShopScene state={state} actions={actions} />,
};

export default (state, actions) => (
  <div class="main">{sceneMap[state.scene.current](state, actions)}</div>
);
