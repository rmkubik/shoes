export const getCurrentEnemyFromMapItem = mapItem => mapItem.enemies[mapItem.currentEnemyIndex];

export const modifyIndex = (array, index, modifier) => [
  ...array.slice(0, index),
  modifier(array[index]),
  ...array.slice(index + 1),
];

export const removeIndex = (array, index) => [...array.slice(0, index), ...array.slice(index + 1)];

const calcShoeDamage = (attacker, defender, damage) =>
  damage * (attacker.stats.attack.current / defender.stats.defense.current);

export const dealShoeDamage = (attacker, defender, damage) => ({
  ...defender,
  hp: {
    ...defender.hp,
    current: defender.hp.current - calcShoeDamage(attacker, defender, damage),
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

export const decrementItemUses = (items, item) => {
  const newItems = {
    ...items,
    [item]: items[item] - 1,
  };
  if (newItems[item] === 0) {
    delete newItems[item];
  }
  return newItems;
};

export const dealMapItemEnemyDamage = (attacker, mapItem, damage) => ({
  ...mapItem,
  turn: mapItem.turn + 1,
  enemies: modifyIndex(mapItem.enemies, mapItem.currentEnemyIndex, defender =>
    dealShoeDamage(attacker, defender, damage)),
});
