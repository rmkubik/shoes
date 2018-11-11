export default {
  animation: target => target.attack(),
  effect: (target, { amount }) => {
    target.heal(amount);
  },
};
