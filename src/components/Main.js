import { h } from 'hyperapp';

import BattleScene from './BattleScene';
import MapScene from './MapScene';
import { getCurrentEnemy } from '../state/map';

const isEnemyDead = enemy => enemy.hp.current <= 0;

const sceneMap = {
  BattleScene: (state, actions) => <BattleScene state={state} actions={actions} />,
  MapScene: (state, actions) => <MapScene state={state} actions={actions} />,
};

export default (state, actions) => {
  if (isEnemyDead(getCurrentEnemy(state)) && state.scene.current !== 'MapScene') {
    actions.changeScene({ newScene: 'MapScene' });
  }

  return <div class="main">{sceneMap[state.scene.current](state, actions)}</div>;
};
