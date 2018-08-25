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
    image: '../../assets/images/shoes_0.png',
    moves: [moves.thunderKick, moves.specialStomp, moves.lick, moves.crush],
    type: types.boot,
    catchChance: {
      current: 0.3,
      default: 0.3,
    },
    stats: {
      attack: {
        current: 50,
        default: 50,
      },
      defense: {
        current: 150,
        default: 150,
      },
    },
  },
  highHeel: {
    name: 'High Heel',
    hp: {
      max: 100,
      current: 100,
    },
    image: '../../assets/images/shoes_1.png',
    moves: [moves.thunderKick, moves.specialStomp, moves.lick, moves.crush],
    type: types.dress,
    catchChance: {
      current: 0.4,
      default: 0.4,
    },
    stats: {
      attack: {
        current: 125,
        default: 125,
      },
      defense: {
        current: 50,
        default: 50,
      },
    },
  },
};
