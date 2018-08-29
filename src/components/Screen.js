import { h } from 'hyperapp';

import Shoe from './Shoe';
import ShoeDisplay from './ShoeDisplay';

import { isAlive } from '../state/shoes';

export default ({
  enemyAttacking, enemyStopAttack, playerAttacking, playerStopAttack, shoes,
}) => (
  <div class="screen">
    <div>{shoes.enemies.map(enemy => (isAlive(enemy) ? '☐' : '☠'))}</div>
    <Shoe
      shoeAttacking={enemyAttacking}
      shoeStopAttack={enemyStopAttack}
      shoe={shoes.enemy}
      shoeAttackClass={'attackToLeft'}
      flip={true}
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
