import moves from './moves';
import types from './types';

export const isAlive = shoe => shoe.hp.current > 0;

export default {
  boot: {
    name: 'Boot',
    hp: {
      max: 100,
      current: 100,
    },
    image: 'https://r-k.io/assets/images/ssj18parody/shoes_0.png',
    moves: [moves.thunderKick, moves.specialStomp, moves.lick, moves.crush],
    type: types.boot,
  },
  highHeel: {
    name: 'High Heel',
    hp: {
      max: 100,
      current: 100,
    },
    image: 'https://r-k.io/assets/images/ssj18parody/shoes_1.png',
    moves: [moves.thunderKick, moves.specialStomp, moves.lick, moves.crush],
    type: types.dress,
  },
};
