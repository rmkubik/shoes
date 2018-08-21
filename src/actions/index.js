const getCurrentEnemyFromMapItem = mapItem => mapItem.enemies[mapItem.currentEnemyIndex];

const dealMapItemEnemyDamage = (mapItem, damage) => {
  const enemy = getCurrentEnemyFromMapItem(mapItem);

  return {
    ...mapItem,
    enemies: [
      ...mapItem.enemies.slice(0, mapItem.currentEnemyIndex),
      {
        ...enemy,
        hp: {
          ...enemy.hp,
          current: enemy.hp.current - damage,
        },
      },
      ...mapItem.enemies.slice(mapItem.currentEnemyIndex + 1),
    ],
  };
};

export default {
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
};
