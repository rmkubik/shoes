export default {
  // useMove: ({ move }) => () =>
  playerAttack: () => () => ({
    playerAttacking: true,
  }),
  playerStopAttack: () => () => ({
    playerAttacking: false,
  }),
};
