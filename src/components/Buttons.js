import { h } from 'hyperapp';

export default ({ playerAttack, moves }) => (
  <div class="buttons">
    {moves.map(move => <button onclick={() => playerAttack(move)}>{move.name}</button>)}
  </div>
);
