export default {
  animation: target => target.attack(),
  effect: (target, { damage }) => {
    target.takeDamage(damage);
  },
};
