function decrementItemUse(state, item) {
  state.player.items[item] -= 1;
}

function restoreAllMovesUses(shoe) {
  shoe.moves = shoe.moves.map(move => ({
    ...move,
    uses: {
      ...move.uses,
      current: move.uses.max,
    },
  }));
}

export default {
  decrementItemUse,
  restoreAllMovesUses,
};
