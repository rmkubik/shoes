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
    moves: [moves.crush, moves.mend],
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
    moves: [moves.quick, moves.sunder],
    type: types.dress,
    catchChance: {
      current: 0.4,
      default: 0.4,
    },
    stats: {
      attack: {
        current: 150,
        default: 150,
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
      max: 150,
      current: 150,
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
        current: 100,
        default: 100,
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
    moves: [moves.spur, moves.crush, moves.sunder],
    type: types.boot,
    catchChance: {
      current: 0.3,
      default: 0.3,
    },
    stats: {
      attack: {
        current: 75,
        default: 75,
      },
      defense: {
        current: 130,
        default: 130,
      },
    },
  },
  cleat: {
    name: 'Soccer Cleat',
    hp: {
      max: 75,
      current: 75,
    },
    imageKey: 'cleat',
    moves: [moves.quick, moves.lick],
    type: types.boot,
    catchChance: {
      current: 0.3,
      default: 0.3,
    },
    stats: {
      attack: {
        current: 125,
        default: 125,
      },
      defense: {
        current: 100,
        default: 100,
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
    moves: [moves.flail, moves.bounce],
    type: types.slipOn,
    catchChance: {
      current: 0.3,
      default: 0.3,
    },
    stats: {
      attack: {
        current: 80,
        default: 80,
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
      max: 220,
      current: 220,
    },
    imageKey: 'clown',
    moves: [moves.crush, moves.squirt],
    type: types.sneaker,
    catchChance: {
      current: 0.2,
      default: 0.2,
    },
    stats: {
      attack: {
        current: 125,
        default: 125,
      },
      defense: {
        current: 125,
        default: 125,
      },
    },
  },
  flats: {
    name: 'Ballet Flats',
    hp: {
      max: 50,
      current: 50,
    },
    imageKey: 'flats',
    moves: [moves.quick, moves.pumpUp],
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
        current: 150,
        default: 150,
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
    moves: [moves.quick, moves.mend],
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
      max: 100,
      current: 100,
    },
    imageKey: 'sneaker',
    moves: [moves.lick],
    type: types.slipOn,
    catchChance: {
      current: 0.4,
      default: 0.4,
    },
    stats: {
      attack: {
        current: 100,
        default: 100,
      },
      defense: {
        current: 100,
        default: 100,
      },
    },
  },
};
