function decrementItemUse(state, item) {
  state.player.items[item] -= 1;
}

function incrementItemUse(state, item) {
  state.player.items[item] = state.player.items[item] ? state.player.items[item] + 1 : 1;
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

function resetAllPlayerShoeStatsToBaseAmount(state) {
  state.player.shoes.forEach((shoe) => {
    Object.values(shoe.stats).forEach((stat) => {
      stat.current = stat.default;
    });
  });
}

export default {
  decrementItemUse,
  incrementItemUse,
  restoreAllMovesUses,
  resetAllPlayerShoeStatsToBaseAmount,
};
