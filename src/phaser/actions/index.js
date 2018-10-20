import state from '../state/index';

// const curryAction = state => asdf => console.log(state + asdf);
// const modifyIndex = (array, index, modifier) => [
//   ...array.slice(0, index),
//   modifier(array[index]),
//   ...array.slice(index + 1),
// ];

// curryAction(

export default {
  attack: (move, target, damage) => {
    state.playerAttacking = false;
    move.uses.current -= 1;
    target.hp.current -= damage;
  },
};
