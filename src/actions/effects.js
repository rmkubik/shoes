import { modifyIndex, getCurrentEnemyFromMapItem } from './actionHelpers';

export default {
  attemptCatch: () => ({ player, map, currentMapIndex }) => {
    const catchChance = 0.5;
    const newState = {
      player: {
        ...player,
        items: {
          ...player.items,
          shoeBox: player.items.shoeBox - 1,
        },
      },
    };
    if (Math.random() > catchChance) {
      newState.player.shoes.push(getCurrentEnemyFromMapItem(map[currentMapIndex]));
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
    },
  }),
};
