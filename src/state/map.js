import shoes from './shoes';
import { pickRandomlyFromArray } from '../helpers';

export const getCurrentEnemy = (state) => {
  const currentMapItem = state.map[state.currentMapIndex];
  return currentMapItem.enemies[currentMapItem.currentEnemyIndex];
};

export const getNextEnemyIndex = (state) => {
  const currentMapItem = state.map[state.currentMapIndex];
  currentMapItem.enemies.filter(enemy);
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
