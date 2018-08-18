import { h } from 'hyperapp';

import ShoeDisplay from './ShoeDisplay';

export default ({ playerAttacking, playerStopAttack, shoe }) => (
  <div
    className={playerAttacking ? 'attackToRight' : ''}
    oncreate={(element) => {
      element.addEventListener('animationend', () => {
        playerStopAttack();
      });
    }}
  >
    <ShoeDisplay shoe={shoe} />
  </div>
);
