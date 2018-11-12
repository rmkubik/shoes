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
    imageKey: 'boot',
    moves: [moves.pumpUp, moves.sunder, moves.crush, moves.mend],
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
    imageKey: 'highHeel',
    moves: [moves.stab, moves.puncture],
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
  croc: {
    name: 'Croc',
    hp: {
      max: 100,
      current: 100,
    },
    imageKey: 'croc',
    moves: [moves.chomp, moves.flail],
    type: types.slipOn,
    catchChance: {
      current: 0.6,
      default: 0.6,
    },
    stats: {
      attack: {
        current: 100,
        default: 100,
      },
      defense: {
        current: 120,
        default: 120,
      },
    },
  },
  cowboy: {
    name: 'Cowboy Boot',
    hp: {
      max: 100,
      current: 100,
    },
    imageKey: 'cowboy',
    moves: [moves.spur, moves.squish],
    type: types.boot,
    catchChance: {
      current: 0.3,
      default: 0.3,
    },
    stats: {
      attack: {
        current: 120,
        default: 120,
      },
      defense: {
        current: 80,
        default: 80,
      },
    },
  },
  cleat: {
    name: 'Soccer Cleat',
    hp: {
      max: 80,
      current: 80,
    },
    imageKey: 'cleat',
    moves: [moves.thunderKick, moves.quick],
    type: types.boot,
    catchChance: {
      current: 0.3,
      default: 0.3,
    },
    stats: {
      attack: {
        current: 135,
        default: 135,
      },
      defense: {
        current: 70,
        default: 70,
      },
    },
  },
  slipper: {
    name: 'Bunny Slipper',
    hp: {
      max: 80,
      current: 80,
    },
    imageKey: 'slipper',
    moves: [moves.flail, moves.quick, moves.squish],
    type: types.slipOn,
    catchChance: {
      current: 0.3,
      default: 0.3,
    },
    stats: {
      attack: {
        current: 135,
        default: 135,
      },
      defense: {
        current: 70,
        default: 70,
      },
    },
  },
  clown: {
    name: 'Clown Shoes',
    hp: {
      max: 140,
      current: 140,
    },
    imageKey: 'clown',
    moves: [moves.squish, moves.squirt],
    type: types.sneaker,
    catchChance: {
      current: 0.2,
      default: 0.2,
    },
    stats: {
      attack: {
        current: 90,
        default: 90,
      },
      defense: {
        current: 110,
        default: 110,
      },
    },
  },
  flats: {
    name: 'Ballet Flats',
    hp: {
      max: 70,
      current: 70,
    },
    imageKey: 'flats',
    moves: [moves.dance, moves.love],
    type: types.dress,
    catchChance: {
      current: 0.3,
      default: 0.3,
    },
    stats: {
      attack: {
        current: 120,
        default: 120,
      },
      defense: {
        current: 120,
        default: 120,
      },
    },
  },
  sandal: {
    name: 'Sandals',
    hp: {
      max: 90,
      current: 90,
    },
    imageKey: 'sandal',
    moves: [moves.whip],
    type: types.slipOn,
    catchChance: {
      current: 0.4,
      default: 0.4,
    },
    stats: {
      attack: {
        current: 110,
        default: 110,
      },
      defense: {
        current: 80,
        default: 80,
      },
    },
  },
  sneaker: {
    name: 'Sneaker',
    hp: {
      max: 110,
      current: 110,
    },
    imageKey: 'sneaker',
    moves: [moves.lick, moves.thunderKick],
    type: types.slipOn,
    catchChance: {
      current: 0.4,
      default: 0.4,
    },
    stats: {
      attack: {
        current: 135,
        default: 135,
      },
      defense: {
        current: 100,
        default: 100,
      },
    },
  },
};
