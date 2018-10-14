import { h } from 'hyperapp';

import Buttons from './Buttons';
import Screen from './Screen';
import { getCurrentEnemy, getNextEnemyIndex, isPlayerTurn } from '../state/map';
import { isAlive } from '../state/shoes';
import { pickRandomlyFromArray, pickRandomArrayIndex } from '../helpers';
import { getNextShoeIndex } from '../state/player';

const allShoesDead = shoes => !shoes.some(isAlive);

export default ({ state, actions }) => {
  if (allShoesDead(state.player.shoes)) {
    alert('GAME OVER PLAYER LOSES!');
  } else if (allShoesDead(state.map[state.currentMapIndex].enemies)) {
    if (!state.playerAttacking) {
      // only reward player if an enemy is still present (and dead)
      // this happens when you capture the last shoe in a wild encounter
      if (state.map[state.currentMapIndex].enemies.length > 0) {
        actions.rewardPlayer();
      }
      actions.changeScene({ newScene: 'MapScene', currentMapIndex: state.currentMapIndex + 1 });
    }
  } else if (!isAlive(getCurrentEnemy(state))) {
    actions.changeCurrentEnemyIndex({ index: getNextEnemyIndex(state) });
  } else if (!isAlive(state.player.shoes[state.player.currentShoe])) {
    actions.changeCurrentShoeIndex({ index: getNextShoeIndex(state) });
  } else if (!isPlayerTurn(state) && !state.enemyAttacking && !state.playerAttacking) {
    const movesWithUsesLeft = getCurrentEnemy(state).moves.filter(move => move.uses.current > 0);
    const randomIndex = pickRandomArrayIndex(movesWithUsesLeft);
    actions.enemyAttack({
      damage: movesWithUsesLeft[randomIndex].damage,
      index: randomIndex,
    });
  }

  return (
    <div class="battleScene">
      {/* <Screen
        playerAttacking={state.playerAttacking}
        playerStopAttack={actions.playerStopAttack}
        enemyAttacking={state.enemyAttacking}
        enemyStopAttack={actions.enemyStopAttack}
        shoes={{
          player: state.player.shoes[state.player.currentShoe],
          enemy: getCurrentEnemy(state),
          enemies: state.map[state.currentMapIndex].enemies,
        }}
      /> */}
      <Buttons
        playerAttacking={state.playerAttacking}
        enemyAttacking={state.enemyAttacking}
        playerAttack={actions.playerAttack}
        moves={state.player.shoes[state.player.currentShoe].moves}
        wild={state.map[state.currentMapIndex].wild}
        attemptCatch={actions.attemptCatch}
        items={Object.entries(state.player.items)}
        itemList={state.items}
        actions={actions}
        playerShoes={state.player.shoes}
        currentShoe={state.player.currentShoe}
      />
    </div>
  );
};
