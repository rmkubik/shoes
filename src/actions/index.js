const dealMapItemEnemyDamage = (mapItem, damage) => ({
  ...mapItem,
  enemy: {
    ...mapItem.enemy,
    hp: {
      ...mapItem.enemy.hp,
      current: mapItem.enemy.hp.current - damage,
    },
  },
});

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
    currentMapIndex: newCurrentMapIndex || currentMapIndex,
    scene: {
      ...scene,
      current: newScene,
    },
  }),
};
