import shoes, { isAlive } from './shoes';
import items from './items';

export const getCurrentEnemy = (state) => {
  const currentMapItem = state.map[state.currentMapIndex];
  return currentMapItem.enemies[currentMapItem.currentEnemyIndex];
};

export const getNextEnemyIndex = (state) => {
  const currentMapItem = state.map[state.currentMapIndex];
  return currentMapItem.enemies.findIndex(isAlive);
};

export const isPlayerTurn = (state) => {
  const currentMapItem = state.map[state.currentMapIndex];
  return currentMapItem.playerFirst ? currentMapItem.turn % 2 === 0 : currentMapItem.turn % 2 === 1;
};

export default [
  {
    enemies: [shoes.highHeel],
    currentEnemyIndex: 0,
    name: 'A Wild Shoe Appears!',
    scene: 'BattleScene',
    wild: true,
    turn: 0,
    playerFirst: true,
  },
  {
    enemies: [shoes.boot],
    currentEnemyIndex: 0,
    name: 'A Wild Shoe Appears!',
    scene: 'BattleScene',
    wild: true,
    turn: 0,
    playerFirst: true,
  },
  {
    enemies: [shoes.boot, shoes.highHeel],
    currentEnemyIndex: 0,
    name: 'Trainer Battle',
    scene: 'BattleScene',
    turn: 0,
    playerFirst: true,
  },
  {
    name: 'Shop',
    scene: 'ShopScene',
    items: [items.shoeBox, items.elasticLaces, items.velcroStrap],
  },
  {
    enemies: [shoes.highHeel],
    currentEnemyIndex: 0,
    name: 'A Wild Shoe Appears!',
    scene: 'BattleScene',
    wild: true,
    turn: 0,
    playerFirst: true,
  },
  {
    enemies: [shoes.boot],
    currentEnemyIndex: 0,
    name: 'A Wild Shoe Appears!',
    scene: 'BattleScene',
    wild: true,
    turn: 0,
    playerFirst: true,
  },
  {
    enemies: [shoes.boot, shoes.highHeel],
    currentEnemyIndex: 0,
    name: 'Trainer Battle',
    scene: 'BattleScene',
    turn: 0,
    playerFirst: true,
  },
  {
    name: 'Shop',
    scene: 'ShopScene',
    items: [items.shoeBox, items.elasticLaces, items.velcroStrap],
  },
];
