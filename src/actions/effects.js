import {
  modifyIndex,
  removeIndex,
  getCurrentEnemyFromMapItem,
  decrementItemUses,
} from './actionHelpers';

export default {
  attemptCatch: () => ({ player, map, currentMapIndex }) => {
    const catchChance = 0.5;
    const newState = {
      player: {
        ...player,
        items: decrementItemUses(player.items, 'shoeBox'),
      },
    };

    if (map[currentMapIndex].wild && Math.random() > catchChance) {
      newState.player.shoes.push(getCurrentEnemyFromMapItem(map[currentMapIndex]));
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
