import { h } from 'hyperapp';

import Buttons from './Buttons';
import Screen from './Screen';
import { getCurrentEnemy, getNextEnemyIndex, isPlayerTurn } from '../state/map';
import { isAlive } from '../state/shoes';
import { pickRandomlyFromArray } from '../helpers';

const allShoesDead = shoes => !shoes.some(isAlive);

export default ({ state, actions }) => {
  if (allShoesDead(state.player.shoes)) {
    alert('GAME OVER PLAYER LOSES!');
  } else if (allShoesDead(state.map[state.currentMapIndex].enemies)) {
    if (!state.playerAttacking) {
      actions.rewardPlayer();
      actions.changeScene({ newScene: 'MapScene', currentMapIndex: state.currentMapIndex + 1 });
    }
  } else if (!isAlive(getCurrentEnemy(state))) {
    actions.changeCurrentEnemyIndex({ index: getNextEnemyIndex(state) });
  } else if (!isPlayerTurn(state) && !state.enemyAttacking && !state.playerAttacking) {
    actions.enemyAttack({ damage: pickRandomlyFromArray(getCurrentEnemy(state).moves).damage });
  }

  return (
    <div class="battleScene">
      <Screen
        playerAttacking={state.playerAttacking}
        playerStopAttack={actions.playerStopAttack}
        enemyAttacking={state.enemyAttacking}
        enemyStopAttack={actions.enemyStopAttack}
        shoes={{
          player: state.player.shoes[state.player.currentShoe],
          enemy: getCurrentEnemy(state),
        }}
      />
      <Buttons
        playerAttack={actions.playerAttack}
        moves={state.player.shoes[state.player.currentShoe].moves}
        wild={state.map[state.currentMapIndex].wild}
        attemptCatch={actions.attemptCatch}
        items={Object.entries(state.player.items)}
        itemList={state.items}
        actions={actions}
      />
    </div>
  );
};
