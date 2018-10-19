import shoes, { isAlive } from './shoes';
import { pickRandomlyFromArray } from '../../helpers';

export const getNextShoeIndex = state => state.player.shoes.findIndex(isAlive);

export default {
  shoes: [pickRandomlyFromArray([shoes.highHeel, shoes.boot, shoes.sneaker])],
  items: {
    shoeBox: 5,
    shoeRepairKit: 2,
  },
  currentShoe: 0,
  money: 30,
};
