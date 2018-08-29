import { h } from 'hyperapp';

import ShoeDisplay from './ShoeDisplay';

export default ({
  shoeAttacking, shoeStopAttack, shoe, shoeAttackClass, flip,
}) => (
  <div
    className={shoeAttacking ? shoeAttackClass : ''}
    oncreate={(element) => {
      element.addEventListener('animationend', () => {
        shoeStopAttack();
      });
    }}
  >
    <ShoeDisplay shoe={shoe} flip={flip} />
  </div>
);
