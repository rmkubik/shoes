import shoes from './shoes';

export const getCurrentEnemy = (state) => {
  const currentMapItem = state.map[state.currentMapIndex];
  return currentMapItem.enemies[currentMapItem.currentEnemyIndex];
};

export default [
  {
    enemies: [shoes.highHeel],
    currentEnemyIndex: 0,
    name: 'A Wild Shoe Appears!',
    scene: 'BattleScene',
  },
  {
    enemies: [shoes.boot],
    currentEnemyIndex: 0,
    name: 'A Wild Shoe Appears!',
    scene: 'BattleScene',
  },
  {
    enemies: [shoes.boot, shoes.highHeel],
    currentEnemyIndex: 0,
    name: 'Trainer Battle',
    scene: 'BattleScene',
  },
];
