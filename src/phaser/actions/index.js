// import state from '../state/index';

export default {
  attack: state => (move, target, damage) => {
    state.playerAttacking = false;
    move.uses.current -= 1;
    target.hp.current -= damage;
  },
  advanceMapIndex: state => () => {
    state.currentMapIndex += 1;
  },
};
