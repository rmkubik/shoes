const getCurrentEnemyFromMapItem = mapItem => mapItem.enemies[mapItem.currentEnemyIndex];

const modifyIndex = (array, index, modifier) => [
  ...array.slice(0, index),
  modifier(array[index]),
  ...array.slice(index + 1),
];

const dealShoeDamage = (shoe, damage) => ({
  ...shoe,
  hp: {
    ...shoe.hp,
    current: shoe.hp.current - damage,
  },
});

const decrementMoveUses = (shoe, moveIndex) => ({
  ...shoe,
  moves: modifyIndex(shoe.moves, moveIndex, move => ({
    ...move,
    uses: move.uses - 1,
  })),
});

const dealMapItemEnemyDamage = (mapItem, damage) => ({
  ...mapItem,
  turn: mapItem.turn + 1,
  enemies: modifyIndex(mapItem.enemies, mapItem.currentEnemyIndex, shoe =>
    dealShoeDamage(shoe, damage)),
});

export default {
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
