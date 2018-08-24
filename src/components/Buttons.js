import { h } from 'hyperapp';

export default ({
  playerAttack, moves, wild, attemptCatch,
}) => (
  <div class="buttons">
    {moves.map((move, index) => (
      <button
        onclick={() => {
          if (move.uses.current > 0) {
            playerAttack({ damage: move.damage, index });
          }
        }}
      >
        {`${move.name} - ${move.uses.current}/${move.uses.max}`}
      </button>
    ))}
    {wild && <button onclick={attemptCatch}>Throw Shoe Box</button>}
  </div>
);
