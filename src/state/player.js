import shoes, { isAlive } from './shoes';

export const getNextShoeIndex = state => state.player.shoes.findIndex(isAlive);

export default {
  shoes: [shoes.highHeel],
  items: {
    shoeBox: 5,
    shoeRepairKit: 2,
  },
  currentShoe: 0,
  money: 30,
};
