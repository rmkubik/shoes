export default {
  animation: target => target.attack(),
  effect: (attacker, target, { damage }) => {
    const newDamage = (attacker.state.stats.attack.current / target.state.stats.defense.current) * damage;
    console.log(newDamage);
    target.takeDamage(newDamage);
  },
};
