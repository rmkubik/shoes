import effects from './effects';
import {
  modifyIndex,
  dealShoeDamage,
  dealMapItemEnemyDamage,
  decrementMoveUses,
} from './actionHelpers';

export default {
  ...effects,
  enemyAttack: ({ damage }) => ({ player }) => ({
    enemyAttacking: true,
    player: {
      ...player,
      shoes: modifyIndex(player.shoes, player.currentShoe, shoe => dealShoeDamage(shoe, damage)),
    },
  }),
  enemyStopAttack: () => ({ map, currentMapIndex }) => ({
    enemyAttacking: false,
    map: modifyIndex(map, currentMapIndex, mapItem => ({
      ...mapItem,
      turn: mapItem.turn + 1,
    })),
  }),
  playerAttack: ({ damage, index }) => ({ map, currentMapIndex, player }) => ({
    playerAttacking: true,
    map: modifyIndex(map, currentMapIndex, mapItem => dealMapItemEnemyDamage(mapItem, damage)),
    player: {
      ...player,
      shoes: modifyIndex(player.shoes, player.currentShoe, shoe => decrementMoveUses(shoe, index)),
    },
  }),
  playerStopAttack: () => () => ({
    playerAttacking: false,
  }),
  changeScene: ({ newScene, currentMapIndex: newCurrentMapIndex }) => ({
    scene,
    currentMapIndex,
  }) => ({
    // need to use ternary intstead of || in case newCurrentMapIndex is 0
    currentMapIndex: newCurrentMapIndex === undefined ? currentMapIndex : newCurrentMapIndex,
    scene: {
      ...scene,
      current: newScene,
    },
  }),
  changeCurrentEnemyIndex: ({ index }) => ({ map, currentMapIndex }) => ({
    map: modifyIndex(map, currentMapIndex, mapItem => ({
      ...mapItem,
      currentEnemyIndex: index,
    })),
  }),
  changeCurrentShoeIndex: ({ index }) => ({ player }) => ({
    player: {
      ...player,
      currentShoe: index,
    },
  }),
  purchaseItem: ({ key }) => ({ items, player }) => {
    const newItems = { ...player.items };
    newItems[key] = newItems[key] ? newItems[key] + 1 : 1;

    return {
      player: {
        ...player,
        items: newItems,
        money: player.money - items[key].cost,
      },
    };
  },
  rewardPlayer: () => ({ map, currentMapIndex, player }) => ({
    player: {
      ...player,
      money: player.money + map[currentMapIndex].reward,
    },
  }),
};
