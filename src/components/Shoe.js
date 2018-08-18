import { h } from 'hyperapp';

import ShoeDisplay from './ShoeDisplay';

export default ({
  playerAttacking, playerStopAttack, image, hp, name,
}) => (
  <div
    className={playerAttacking ? 'attackToRight' : ''}
    oncreate={(element) => {
      element.addEventListener('animationend', () => {
        playerStopAttack();
      });
    }}
  >
    <ShoeDisplay image={image} name={name} hp={hp} />
  </div>
);
