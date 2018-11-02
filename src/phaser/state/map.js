import shoes, { isAlive } from './shoes';
import items from './items';
import { pickRandomlyFromArray } from '../../helpers';

export const getCurrentMapItem = state => state.map[state.currentMapIndex];

export const getCurrentEnemy = (state) => {
  const currentMapItem = getCurrentMapItem(state);
  return currentMapItem.enemies[currentMapItem.currentEnemyIndex];
};

export const getCurrentPlayerShoe = state => state.player.shoes[state.player.currentShoe];

export const getNextEnemyIndex = (state) => {
  const currentMapItem = getCurrentMapItem(state);
  return currentMapItem.enemies.findIndex(isAlive);
};

export const isPlayerTurn = (state) => {
  const currentMapItem = getCurrentMapItem(state);
  return currentMapItem.playerFirst ? currentMapItem.turn % 2 === 0 : currentMapItem.turn % 2 === 1;
};

const allShoesDead = shoeList => shoeList.every(shoe => shoe.hp.current <= 0);

export const isEncounterOver = (state, index) => (
  allShoesDead(state.map[index].enemies) || allShoesDead(state.player.shoes)
);

export const isCurrentEncounterOver = state => isEncounterOver(state, state.currentMapIndex);

export default [
  {
    name: 'Home',
    scene: 'HomeScene',
    mapKey: 'house',
  },
  {
    enemies: [pickRandomlyFromArray([shoes.sneaker, shoes.cleat])],
    currentEnemyIndex: 0,
    name: 'A Wild Shoe Appears!',
    scene: 'BattleScene',
    mapKey: 'narrows', // pickRandomlyFromArray(['clearing', 'clearing2']),
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
    mapKey: pickRandomlyFromArray(['clearing', 'clearing2']),
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
    mapKey: pickRandomlyFromArray(['clearing', 'clearing2']),
    turn: 0,
    reward: 150,
    playerFirst: true,
  },
  {
    name: 'Cobbler',
    scene: 'ShopScene',
    mapKey: 'cobbler',
    items: [items.shoeBox, items.shoeRepairKit],
  },
  {
    enemies: [shoes.highHeel],
    currentEnemyIndex: 0,
    name: 'A Wild Shoe Appears!',
    scene: 'BattleScene',
    mapKey: pickRandomlyFromArray(['clearing', 'clearing2']),
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
    mapKey: pickRandomlyFromArray(['clearing', 'clearing2']),
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
    mapKey: pickRandomlyFromArray(['clearing', 'clearing2']),
    turn: 0,
    reward: 150,
    playerFirst: true,
  },
  {
    name: 'Cobbler',
    scene: 'ShopScene',
    mapKey: 'cobbler',
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
    mapKey: pickRandomlyFromArray(['clearing', 'clearing2']),
    turn: 0,
    reward: 250,
    playerFirst: true,
  },
];
