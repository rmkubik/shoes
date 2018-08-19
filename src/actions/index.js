export default {
  // useMove: ({ move }) => () =>
  playerAttack: ({ damage }) => ({ enemy }) => ({
    playerAttacking: true,
    enemy: {
      ...enemy,
      hp: {
        ...enemy.hp,
        current: enemy.hp.current - damage,
      },
    },
  }),
  playerStopAttack: () => () => ({
    playerAttacking: false,
  }),
};
