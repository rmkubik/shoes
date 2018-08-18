import { h } from 'hyperapp';

export default ({ playerAttack, moves }) => (
  <div class="buttons">
    <button onclick={playerAttack}>{moves.thunderKick.name}</button>
    <button onclick={playerAttack}>{moves.specialStomp.name}</button>
    <button onclick={playerAttack}>{moves.crush.name}</button>
    <button onclick={playerAttack}>{moves.lick.name}</button>
  </div>
);
