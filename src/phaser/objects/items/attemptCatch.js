import helpers from './helpers';
import { getCurrentMapItem, getCurrentEnemy } from '../../state/map';


const calcCatchChance = shoe => (1 - (shoe.hp.current / shoe.hp.max)) * shoe.catchChance.current;

export default (state) => {
  const encounter = getCurrentMapItem(state);
  const enemy = getCurrentEnemy(state);
  if (encounter.wild && Math.random() < calcCatchChance(enemy)) {
    enemy.hp.current = enemy.hp.max;
    helpers.restoreAllMovesUses(enemy);
    state.player.shoes.push(enemy);
    encounter.enemies.splice(encounter.currentEnemyIndex, 1);
  }
};
