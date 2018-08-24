import { h } from 'hyperapp';

export default ({
  playerAttack, moves, wild, attemptCatch,
}) => (
  <div class="buttons">
    {moves.map((move, index) => (
      <button
        onclick={() => {
          if (move.uses > 0) {
            playerAttack({ damage: move.damage, index });
          }
        }}
      >
        {move.name}
      </button>
    ))}
    {wild && <button onclick={attemptCatch}>Throw Shoe Box</button>}
  </div>
);
