import { h } from 'hyperapp';

export default ({ playerAttacking, playerStopAttack }) => (
  <div class="screen">
    <div />
    <div id="i1">
      <img src="https://r-k.io/assets/images/ssj18parody/shoes_0.png" />
      <p> Boot </p>
      <progress value="22" max="100" />
    </div>
    <div
      id="i2"
      className={playerAttacking ? 'attackToRight' : ''}
      oncreate={(element) => {
        element.addEventListener('animationend', () => {
          playerStopAttack();
        });
      }}
    >
      <img src="https://r-k.io/assets/images/ssj18parody/shoes_1.png" />
      <p> High Heel </p>
      <progress value="80" max="100" />
    </div>
    <div />
  </div>
);
