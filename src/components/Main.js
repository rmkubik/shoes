import { h } from 'hyperapp';

import BattleScene from './BattleScene';
import MapScene from './MapScene';
import ShopScene from './ShopScene';
// import { isAlive } from '../state/shoes';
// import { getCurrentEnemy, getNextEnemyIndex } from '../state/map';

import Game from './Game';

// const sceneMap = {
//   BattleScene: (state, actions) => <BattleScene state={state} actions={actions} />,
//   MapScene: (state, actions) => <Game state={state} actions={actions} gameParentId={'game'} />,
//   ShopScene: (state, actions) => <ShopScene state={state} actions={actions} />,
// };

const sceneMap = (state, actions) => {
  switch (state.scene.current) {
    case 'ShopScene':
      return <ShopScene state={state} actions={actions} />;
    case 'BattleScene':
      return <BattleScene state={state} actions={actions} />;
    default:
    case 'MapScene':
      // no hyperapp scene
      break;
  }
};

export default (state, actions) => (
  <div class="main">
    <Game state={state} actions={actions} gameParentId={'game'} />
    {sceneMap(state, actions)}
  </div>
);

// export default (state, actions) => (
//   <Game state={state} actions={actions} gameParentId={'game'}/>
// );
