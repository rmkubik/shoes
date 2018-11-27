import shoes, { isAlive } from './shoes';
import items from './items';
import { pickRandomlyFromArray } from '../../helpers';

export const getMapItem = (state, mapIndex, encounterIndex) =>
  state.map[mapIndex].encounters[encounterIndex];

export const getCurrentMapItem = state =>
  getMapItem(state, state.currentMapIndex, state.currentEncounterIndex);

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

// Can always enter a shop
export const isEncounterOver = (state, mapIndex, encounterIndex) => {
  if (getCurrentMapItem(state).scene === 'BattleScene') {
    return allShoesDead(state.map[mapIndex].encounters[encounterIndex].enemies)
      || allShoesDead(state.player.shoes);
  }

  return getCurrentMapItem(state).finished;
};

export const isCurrentEncounterOver = state => isEncounterOver(
  state,
  state.currentMapIndex,
  state.currentEncounterIndex,
);

export default [
  {
    name: 'Home',
    scene: 'HomeScene',
    mapKey: 'house',
  },
  {
    mapKey: 'splitTwoGrass', // pickRandomlyFromArray(['clearing', 'clearing2']),
    encounters: [
      {
        enemies: [pickRandomlyFromArray([shoes.slipper, shoes.cleat])],
        currentEnemyIndex: 0,
        name: 'A Wild Shoe Appears!',
        scene: 'BattleScene',
        wild: true,
        turn: 0,
        reward: 50,
        playerFirst: true,
      },
      {
        enemies: [pickRandomlyFromArray([shoes.slipper, shoes.cleat])],
        currentEnemyIndex: 0,
        name: 'A Wild Shoe Appears!',
        scene: 'BattleScene',
        wild: true,
        turn: 0,
        reward: 50,
        playerFirst: true,
      },
    ],
  },
  {
    mapKey: 'splitThreeGrass', // pickRandomlyFromArray(['clearing', 'clearing2']),
    encounters: [
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
        enemies: [pickRandomlyFromArray([shoes.boot, shoes.flats, shoes.slipper])],
        currentEnemyIndex: 0,
        name: 'A Wild Shoe Appears!',
        scene: 'BattleScene',
        wild: true,
        turn: 0,
        reward: 50,
        playerFirst: true,
      },
    ],
  },
  {
    mapKey: 'splitTwoGrass', // pickRandomlyFromArray(['clearing', 'clearing2']),
    encounters: [
      {
        enemies: [pickRandomlyFromArray([shoes.slipper, shoes.cleat])],
        currentEnemyIndex: 0,
        name: 'A Wild Shoe Appears!',
        scene: 'BattleScene',
        wild: true,
        turn: 0,
        reward: 50,
        playerFirst: true,
      },
      {
        enemies: [pickRandomlyFromArray([shoes.slipper, shoes.cleat])],
        currentEnemyIndex: 0,
        name: 'A Wild Shoe Appears!',
        scene: 'BattleScene',
        wild: true,
        turn: 0,
        reward: 50,
        playerFirst: true,
      },
    ],
  },
  {
    mapKey: 'splitTwoGrass', // pickRandomlyFromArray(['clearing', 'clearing2']),
    encounters: [
      {
        enemies: [pickRandomlyFromArray([shoes.slipper, shoes.cleat])],
        currentEnemyIndex: 0,
        name: 'A Wild Shoe Appears!',
        scene: 'BattleScene',
        wild: true,
        turn: 0,
        reward: 50,
        playerFirst: true,
      },
      {
        enemies: [pickRandomlyFromArray([shoes.slipper, shoes.cleat])],
        currentEnemyIndex: 0,
        name: 'A Wild Shoe Appears!',
        scene: 'BattleScene',
        wild: true,
        turn: 0,
        reward: 50,
        playerFirst: true,
      },
    ],
  },
  {
    mapKey: 'splitThreeGrass', // pickRandomlyFromArray(['clearing', 'clearing2']),
    encounters: [
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
        enemies: [pickRandomlyFromArray([shoes.boot, shoes.flats, shoes.slipper])],
        currentEnemyIndex: 0,
        name: 'A Wild Shoe Appears!',
        scene: 'BattleScene',
        wild: true,
        turn: 0,
        reward: 50,
        playerFirst: true,
      },
    ],
  },
  // {
  //   enemies: [pickRandomlyFromArray([shoes.boot, shoes.flats, shoes.slipper]), shoes.clown],
  //   currentEnemyIndex: 0,
  //   name: 'Trainer Battle',
  //   scene: 'BattleScene',
  //   mapKey: 'clearing', // 'clearingTrainer',
  //   turn: 0,
  //   reward: 150,
  //   playerFirst: true,
  // },
  // {
  //   name: 'Cobbler',
  //   scene: 'ShopScene',
  //   mapKey: 'cobbler',
  //   items: [items.shoeBox, items.shoeRepairKit],
  //   finished: false,
  // },
  // {
  //   enemies: [shoes.highHeel],
  //   currentEnemyIndex: 0,
  //   name: 'A Wild Shoe Appears!',
  //   scene: 'BattleScene',
  //   mapKey: pickRandomlyFromArray(['clearing', 'clearing2']),
  //   wild: true,
  //   turn: 0,
  //   reward: 50,
  //   playerFirst: true,
  // },
  // {
  //   enemies: [pickRandomlyFromArray([shoes.cowboy, shoes.croc])],
  //   currentEnemyIndex: 0,
  //   name: 'A Wild Shoe Appears!',
  //   scene: 'BattleScene',
  //   mapKey: pickRandomlyFromArray(['clearing', 'clearing2']),
  //   wild: true,
  //   turn: 0,
  //   reward: 50,
  //   playerFirst: true,
  // },
  // {
  //   enemies: [
  //     pickRandomlyFromArray([shoes.cowboy, shoes.croc]),
  //     pickRandomlyFromArray([shoes.cleat, shoes.sandal, shoes.flats]),
  //     pickRandomlyFromArray([shoes.sneaker, shoes.sandal]),
  //   ],
  //   currentEnemyIndex: 0,
  //   name: 'Trainer Battle',
  //   scene: 'BattleScene',
  //   mapKey: pickRandomlyFromArray(['clearing', 'clearing2']),
  //   turn: 0,
  //   reward: 150,
  //   playerFirst: true,
  // },
  // {
  //   name: 'Cobbler',
  //   scene: 'ShopScene',
  //   mapKey: 'cobbler',
  //   items: [items.shoeBox, items.shoeRepairKit],
  //   finished: false,
  // },
  // {
  //   enemies: [
  //     pickRandomlyFromArray([shoes.cowboy, shoes.croc]),
  //     pickRandomlyFromArray([shoes.cleat, shoes.sandal, shoes.flats]),
  //     pickRandomlyFromArray([shoes.sneaker, shoes.sandal]),
  //     pickRandomlyFromArray([shoes.clown, shoes.highHeel]),
  //   ],
  //   currentEnemyIndex: 0,
  //   name: 'Final Throw Down!',
  //   scene: 'BattleScene',
  //   mapKey: pickRandomlyFromArray(['clearing', 'clearing2']),
  //   turn: 0,
  //   reward: 250,
  //   playerFirst: true,
  // },
];
