import { h } from 'hyperapp';

import Buttons from './Buttons';
import Screen from './Screen';
import { getCurrentEnemy, getNextEnemyIndex, isPlayerTurn } from '../state/map';
import { isAlive } from '../state/shoes';
import { pickRandomlyFromArray } from '../helpers';

const isBattleOver = enemies => !enemies.some(isAlive);

export default ({ state, actions }) => {
  if (isBattleOver(state.map[state.currentMapIndex].enemies)) {
    if (!state.playerAttacking) {
      actions.changeScene({ newScene: 'MapScene' });
    }
  } else if (!isAlive(getCurrentEnemy(state))) {
    actions.changeCurrentEnemyIndex({ index: getNextEnemyIndex(state) });
  }

  if (!isPlayerTurn(state)) {
    actions.enemyAttack({ damage: pickRandomlyFromArray(getCurrentEnemy(state).moves).damage });
  }

  return (
    <div class="battleScene">
      <Screen
        playerAttacking={state.playerAttacking}
        playerStopAttack={actions.playerStopAttack}
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
      />
    </div>
  );
};
