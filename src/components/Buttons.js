import { h } from 'hyperapp';

export default ({
  playerAttack, moves, wild, attemptCatch,
}) => (
  <div class="buttons">
    {moves.map(move => <button onclick={() => playerAttack(move)}>{move.name}</button>)}
    {wild && <button onclick={attemptCatch}>Throw Shoe Box</button>}
  </div>
);
