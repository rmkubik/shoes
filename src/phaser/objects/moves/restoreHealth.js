export default {
  animation: target => target.attack(),
  effect: (attacker, target, { amount }) => {
    target.heal(amount);
  },
};
