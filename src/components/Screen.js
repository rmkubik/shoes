import { h } from 'hyperapp';

import Shoe from './Shoe';
import ShoeDisplay from './ShoeDisplay';

export default ({
  enemyAttacking, enemyStopAttack, playerAttacking, playerStopAttack, shoes,
}) => (
  <div class="screen">
    <div />
    <Shoe
      shoeAttacking={enemyAttacking}
      shoeStopAttack={enemyStopAttack}
      shoe={shoes.enemy}
      shoeAttackClass={'attackToLeft'}
    />
    <Shoe
      shoeAttacking={playerAttacking}
      shoeStopAttack={playerStopAttack}
      shoe={shoes.player}
      shoeAttackClass={'attackToRight'}
    />
    <div />
  </div>
);
