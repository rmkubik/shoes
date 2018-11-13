export default {
  animation: target => target.attack(),
  effect: (attacker, target, { amount, stat }) => {
    target.adjustStat(stat, amount);
  },
};
