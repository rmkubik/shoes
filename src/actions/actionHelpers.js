export const getCurrentEnemyFromMapItem = mapItem => mapItem.enemies[mapItem.currentEnemyIndex];

export const modifyIndex = (array, index, modifier) => [
  ...array.slice(0, index),
  modifier(array[index]),
  ...array.slice(index + 1),
];

export const dealShoeDamage = (shoe, damage) => ({
  ...shoe,
  hp: {
    ...shoe.hp,
    current: shoe.hp.current - damage,
  },
});

export const decrementMoveUses = (shoe, moveIndex) => ({
  ...shoe,
  moves: modifyIndex(shoe.moves, moveIndex, move => ({
    ...move,
    uses: {
      ...move.uses,
      current: move.uses.current - 1,
    },
  })),
});

export const dealMapItemEnemyDamage = (mapItem, damage) => ({
  ...mapItem,
  turn: mapItem.turn + 1,
  enemies: modifyIndex(mapItem.enemies, mapItem.currentEnemyIndex, shoe =>
    dealShoeDamage(shoe, damage)),
});
