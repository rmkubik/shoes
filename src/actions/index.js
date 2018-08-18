export default {
  add: (/* event (e) */) => ({ num }) => ({ num: num + 1 }),
  sub: (/* event (e) */) => ({ num }) => ({ num: num - 1 }),
  // useMove: ({ move }) => () =>
  playerAttack: () => () => ({
    playerAttacking: true,
  }),
  playerStopAttack: () => () => ({
    playerAttacking: false,
  }),
};
