import shoes, { isAlive } from './shoes';
import items from './items';
import { pickRandomlyFromArray } from '../../helpers';

export const getCurrentEnemy = (state) => {
  const currentMapItem = state.map[state.currentMapIndex];
  return currentMapItem.enemies[currentMapItem.currentEnemyIndex];
};

export const getCurrentPlayerShoe = state => state.player.shoes[state.player.currentShoe];

export const getNextEnemyIndex = (state) => {
  const currentMapItem = state.map[state.currentMapIndex];
  return currentMapItem.enemies.findIndex(isAlive);
};

export const isPlayerTurn = (state) => {
  const currentMapItem = state.map[state.currentMapIndex];
  return currentMapItem.playerFirst ? currentMapItem.turn % 2 === 0 : currentMapItem.turn % 2 === 1;
};

export const isEncounterOver = (state, index) => (
  state.map[index].enemies.some(enemy => enemy.hp.current <= 0)
);

export const isCurrentEncounterOver = state => isEncounterOver(state, state.currentMapIndex);

export default [
  {
    enemies: [pickRandomlyFromArray([shoes.sneaker, shoes.cleat])],
    currentEnemyIndex: 0,
    name: 'A Wild Shoe Appears!',
    scene: 'BattleScene',
    wild: true,
    turn: 0,
    reward: 50,
    playerFirst: true,
  },
  {
    enemies: [pickRandomlyFromArray([shoes.boot, shoes.flats, shoes.slipper])],
    currentEnemyIndex: 0,
    name: 'A Wild Shoe Appears!',
    scene: 'BattleScene',
    wild: true,
    turn: 0,
    reward: 50,
    playerFirst: true,
  },
  {
    enemies: [pickRandomlyFromArray([shoes.boot, shoes.flats, shoes.slipper]), shoes.clown],
    currentEnemyIndex: 0,
    name: 'Trainer Battle',
    scene: 'BattleScene',
    turn: 0,
    reward: 150,
    playerFirst: true,
  },
  {
    name: 'Cobbler',
    scene: 'ShopScene',
    items: [items.shoeBox, items.shoeRepairKit],
  },
  {
    enemies: [shoes.highHeel],
    currentEnemyIndex: 0,
    name: 'A Wild Shoe Appears!',
    scene: 'BattleScene',
    wild: true,
    turn: 0,
    reward: 50,
    playerFirst: true,
  },
  {
    enemies: [pickRandomlyFromArray([shoes.cowboy, shoes.croc])],
    currentEnemyIndex: 0,
    name: 'A Wild Shoe Appears!',
    scene: 'BattleScene',
    wild: true,
    turn: 0,
    reward: 50,
    playerFirst: true,
  },
  {
    enemies: [
      pickRandomlyFromArray([shoes.cowboy, shoes.croc]),
      pickRandomlyFromArray([shoes.cleat, shoes.sandal, shoes.flats]),
      pickRandomlyFromArray([shoes.sneaker, shoes.sandal]),
    ],
    currentEnemyIndex: 0,
    name: 'Trainer Battle',
    scene: 'BattleScene',
    turn: 0,
    reward: 150,
    playerFirst: true,
  },
  {
    name: 'Cobbler',
    scene: 'ShopScene',
    items: [items.shoeBox, items.shoeRepairKit],
  },
  {
    enemies: [
      pickRandomlyFromArray([shoes.cowboy, shoes.croc]),
      pickRandomlyFromArray([shoes.cleat, shoes.sandal, shoes.flats]),
      pickRandomlyFromArray([shoes.sneaker, shoes.sandal]),
      pickRandomlyFromArray([shoes.clown, shoes.highHeel]),
    ],
    currentEnemyIndex: 0,
    name: 'Final Throw Down!',
    scene: 'BattleScene',
    turn: 0,
    reward: 250,
    playerFirst: true,
  },
];
