import { h } from 'hyperapp';

import BattleScene from './BattleScene';
import MapScene from './MapScene';
import ShopScene from './ShopScene';
import { isAlive } from '../state/shoes';
import { getCurrentEnemy, getNextEnemyIndex } from '../state/map';

const isBattleOver = enemies => !enemies.some(isAlive);

const sceneMap = {
  BattleScene: (state, actions) => <BattleScene state={state} actions={actions} />,
  MapScene: (state, actions) => <MapScene state={state} actions={actions} />,
  ShopScene: (state, actions) => <ShopScene state={state} actions={actions} />,
};

export default (state, actions) => {
  if (state.scene.current === 'BattleScene' && !isAlive(getCurrentEnemy(state))) {
    if (isBattleOver(state.map[state.currentMapIndex].enemies)) {
      if (state.scene.current !== 'MapScene' && !state.playerAttacking) {
        actions.changeScene({ newScene: 'MapScene' });
      }
    } else {
      actions.changeCurrentEnemyIndex({ index: getNextEnemyIndex(state) });
    }
  }

  return <div class="main">{sceneMap[state.scene.current](state, actions)}</div>;
};
