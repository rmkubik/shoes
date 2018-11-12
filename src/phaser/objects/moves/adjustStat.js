export default {
  animation: target => target.attack(),
  effect: (attacker, target, { amount, stat }) => {
    target.state.stats[stat].current += amount;
  },
};
