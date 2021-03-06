import {
  modifyIndex,
  removeIndex,
  getCurrentEnemyFromMapItem,
  decrementItemUses,
  restoreAllMovesUses,
} from './actionHelpers';

const calcCatchChance = shoe => (1 - shoe.hp.current / shoe.hp.max) * shoe.catchChance.current;

export default {
  attemptCatch: () => ({ player, map, currentMapIndex }) => {
    const newState = {
      player: {
        ...player,
        items: decrementItemUses(player.items, 'shoeBox'),
      },
    };

    const enemy = getCurrentEnemyFromMapItem(map[currentMapIndex]);
    if (map[currentMapIndex].wild && Math.random() < calcCatchChance(enemy)) {
      enemy.hp.current = enemy.hp.max;
      const restoredEnemy = restoreAllMovesUses(enemy);
      newState.player.shoes.push(restoredEnemy);
      newState.map = [...map];
      newState.map[currentMapIndex].enemies = removeIndex(
        map[currentMapIndex].enemies,
        map[currentMapIndex].currentEnemyIndex,
      );
    }
    return newState;
  },
  applyShoeRepairKit: () => ({ player }) => ({
    player: {
      ...player,
      shoes: modifyIndex(player.shoes, player.currentShoe, shoe => ({
        ...shoe,
        hp: {
          ...shoe.hp,
          current: shoe.hp.current + 20,
        },
      })),
      items: decrementItemUses(player.items, 'shoeRepairKit'),
    },
  }),
};
