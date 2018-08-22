const getCurrentEnemyFromMapItem = mapItem => mapItem.enemies[mapItem.currentEnemyIndex];

const dealShoeDamage = (shoe, damage) => ({
  ...shoe,
  hp: {
    ...shoe.hp,
    current: shoe.hp.current - damage,
  },
});

const dealMapItemEnemyDamage = (mapItem, damage) => {
  const enemy = getCurrentEnemyFromMapItem(mapItem);

  return {
    ...mapItem,
    turn: mapItem.turn + 1,
    enemies: [
      ...mapItem.enemies.slice(0, mapItem.currentEnemyIndex),
      dealShoeDamage(enemy, damage),
      ...mapItem.enemies.slice(mapItem.currentEnemyIndex + 1),
    ],
  };
};

export default {
  enemyAttack: ({ damage }) => ({ map, currentMapIndex, player }) => ({
    enemyAttacking: true,
    player: {
      ...player,
      shoes: [
        ...player.shoes.slice(0, player.currentShoe),
        dealShoeDamage(player.shoes[player.currentShoe], damage),
        ...player.shoes.slice(player.currentShoe + 1),
      ],
    },
    map: [
      ...map.slice(0, currentMapIndex),
      {
        ...map[currentMapIndex],
        turn: map[currentMapIndex] + 1,
      },
      ...map.slice(currentMapIndex + 1),
    ],
  }),
  enemyStopAttack: () => () => ({
    enemyAttacking: false,
  }),
  playerAttack: ({ damage }) => ({ map, currentMapIndex }) => ({
    playerAttacking: true,
    map: [
      ...map.slice(0, currentMapIndex),
      dealMapItemEnemyDamage(map[currentMapIndex], damage),
      ...map.slice(currentMapIndex + 1),
    ],
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
    map: [
      ...map.slice(0, currentMapIndex),
      {
        ...map[currentMapIndex],
        currentEnemyIndex: index,
      },
      ...map.slice(currentMapIndex + 1),
    ],
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
};
