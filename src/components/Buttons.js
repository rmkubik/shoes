import { h } from 'hyperapp';

export default ({ playerAttack }) => (
  <div class="buttons">
    <button onclick={playerAttack}>Special Stomp</button>
    <button onclick={playerAttack}>Thunder Kick</button>
    <button onclick={playerAttack}>Crush</button>
    <button onclick={playerAttack}>Lick</button>
  </div>
);
