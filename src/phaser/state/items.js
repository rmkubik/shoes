import moves from './moves';

export default {
  shoeBox: {
    key: 'shoeBox',
    name: 'Shoe Box',
    cost: 10,
    useText: 'Throw Shoe Box',
    effect: 'attemptCatch',
    frame: 0,
  },
  elasticLaces: {
    key: 'elasticLaces',
    name: 'Elastic Laces',
    cost: 20,
    frame: 0,
  },
  velcroStrap: {
    key: 'velcroStrap',
    name: 'Velcro Strap',
    cost: 20,
    frame: 0,
  },
  shoeRepairKit: {
    key: 'shoeRepairKit',
    name: 'Shoe Repair Kit',
    cost: 30,
    effect: 'applyShoeRepairKit',
    useText: 'Use Shoe Repair Kit',
    frame: 1,
  },
  teachMend: {
    key: 'teachMend',
    name: 'Mend Skill',
    cost: 50,
    effect: 'teachMove',
    value: moves.mend,
    useText: 'You taught your shoe Mend!',
    frame: 1,
  },
};
