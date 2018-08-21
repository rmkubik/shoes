import { h } from 'hyperapp';

import BattleScene from './BattleScene';
import MapScene from './MapScene';
import { isAlive } from '../state/shoes';

const isBattleOver = enemies => !enemies.some(isAlive);

const sceneMap = {
  BattleScene: (state, actions) => <BattleScene state={state} actions={actions} />,
  MapScene: (state, actions) => <MapScene state={state} actions={actions} />,
};

export default (state, actions) => {
  if (
    isBattleOver(state.map[state.currentMapIndex].enemies) &&
    state.scene.current !== 'MapScene'
  ) {
    actions.changeScene({ newScene: 'MapScene' });
  }

  return <div class="main">{sceneMap[state.scene.current](state, actions)}</div>;
};
