import { h } from 'hyperapp';

import ShoeDisplay from './ShoeDisplay';

export default ({
  shoeAttacking, shoeStopAttack, shoe, shoeAttackClass,
}) => (
  <div
    className={shoeAttacking ? shoeAttackClass : ''}
    oncreate={(element) => {
      element.addEventListener('animationend', () => {
        shoeStopAttack();
      });
    }}
  >
    <ShoeDisplay shoe={shoe} />
  </div>
);
