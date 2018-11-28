import shoes, { isAlive } from './shoes';
import { pickRandomlyFromArray } from '../../helpers';

export const getNextShoeIndex = state => state.player.shoes.findIndex(isAlive);

export default {
  shoes: [shoes.boot], // [pickRandomlyFromArray([shoes.highHeel, shoes.boot, shoes.sneaker])],
  items: {
    shoeBox: 5,
    shoeRepairKit: 2,
    teachMend: 1,
  },
  currentShoe: 0,
  money: 30,
};
