import { h } from 'hyperapp';

import BattleScene from './BattleScene';
import MapScene from './MapScene';

const isEnemyDead = enemy => enemy.hp.current <= 0;

const sceneMap = {
  BattleScene: (state, actions) => <BattleScene state={state} actions={actions} />,
  MapScene: (state, actions) => <MapScene state={state} actions={actions} />,
};

export default (state, actions) => {
  if (isEnemyDead(state.enemy) && state.scene.current === 'BattleScene') {
    actions.changeScene({ newScene: 'MapScene' });
  }

  return <div class="main">{sceneMap[state.scene.current](state, actions)}</div>;
};
