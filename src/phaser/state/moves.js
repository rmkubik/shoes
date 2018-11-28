export default {
  pumpUp: {
    name: 'Pump Up',
    amount: 50,
    uses: {
      current: 10,
      max: 10,
    },
    effect: 'adjustStat',
    stat: 'attack',
    target: 'self',
    description: 'Increase your attack by 50',
  },
  sunder: {
    name: 'Sunder',
    amount: -50,
    uses: {
      current: 10,
      max: 10,
    },
    effect: 'adjustStat',
    stat: 'defense',
    description: 'Decrease opponent\'s defense by 50',
  },
  mend: {
    name: 'Mend',
    amount: 80,
    uses: {
      current: 10,
      max: 10,
    },
    effect: 'restoreHealth',
    target: 'self',
    description: 'Restore your health by 80',
  },
  // specialStomp: {
  //   name: 'Special Stomp',
  //   damage: 10,
  //   uses: {
  //     current: 10,
  //     max: 10,
  //   },
  //   effect: 'dealDamage',
  //   description: 'Do 10 damage',
  // },
  // thunderKick: {
  //   name: 'Thunder Kick',
  //   damage: 30,
  //   uses: {
  //     current: 10,
  //     max: 10,
  //   },
  //   effect: 'dealDamage',
  //   description: 'Do 30 damage',
  // },
  crush: {
    name: 'Crush',
    damage: 45,
    uses: {
      current: 8,
      max: 8,
    },
    effect: 'dealDamage',
    description: 'Do 45 damage',
  },
  lick: {
    name: 'Lick',
    damage: 30,
    uses: {
      current: 15,
      max: 15,
    },
    effect: 'dealDamage',
    description: 'Do 30 damage',
  },
  chomp: {
    name: 'Chomp!',
    damage: 200,
    uses: {
      current: 1,
      max: 1,
    },
    effect: 'dealDamage',
    description: 'Do 200 damage',
  },
  flail: {
    name: 'Flail Around',
    damage: 10,
    uses: {
      current: 20,
      max: 20,
    },
    effect: 'dealDamage',
    description: 'Do 10 damage',
  },
  // stab: {
  //   name: 'Flying Stab',
  //   damage: 45,
  //   uses: {
  //     current: 10,
  //     max: 10,
  //   },
  //   effect: 'dealDamage',
  //   description: 'Do 45 damage',
  // },
  // puncture: {
  //   name: 'Punk-ture',
  //   damage: 35,
  //   uses: {
  //     current: 15,
  //     max: 15,
  //   },
  //   effect: 'dealDamage',
  //   description: 'Do 35 damage',
  // },
  spur: {
    name: 'Spur Wall',
    amount: 50,
    uses: {
      current: 10,
      max: 10,
    },
    effect: 'adjustStat',
    stat: 'defense',
    target: 'self',
    description: 'Increase your defense by 50',
  },
  quick: {
    name: 'Quick Kick',
    damage: 20,
    uses: {
      current: 20,
      max: 20,
    },
    effect: 'dealDamage',
    description: 'Do 20 damage',
  },
  bounce: {
    name: 'Big Bounce',
    damage: 60,
    uses: {
      current: 8,
      max: 8,
    },
    effect: 'dealDamage',
    description: 'Do 60 damage',
  },
  // squish: {
  //   name: 'Big Squish',
  //   damage: 30,
  //   uses: {
  //     current: 12,
  //     max: 12,
  //   },
  //   effect: 'dealDamage',
  //   description: 'Do 30 damage',
  // },
  squirt: {
    name: 'Surprise Squirt',
    amount: -50,
    uses: {
      current: 10,
      max: 10,
    },
    effect: 'adjustStat',
    description: 'Decrease opponent\'s attack by 50',
    stat: 'attack',
  },
  // dance: {
  //   name: 'Do a little Dance',
  //   damage: 25,
  //   uses: {
  //     current: 10,
  //     max: 10,
  //   },
  //   effect: 'dealDamage',
  //   description: 'Do 25 damage',
  // },
  // love: {
  //   name: 'Make a little Love',
  //   damage: 25,
  //   uses: {
  //     current: 10,
  //     max: 10,
  //   },
  //   effect: 'dealDamage',
  //   description: 'Do 25 damage',
  // },
  // whip: {
  //   name: 'Strap Whip',
  //   damage: 30,
  //   uses: {
  //     current: 20,
  //     max: 20,
  //   },
  //   effect: 'dealDamage',
  //   description: 'Do 30 damage',
  // },
};
