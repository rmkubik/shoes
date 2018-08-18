import { h } from 'hyperapp';

import Shoe from './Shoe';
import ShoeDisplay from './ShoeDisplay';

export default ({ playerAttacking, playerStopAttack, shoes }) => (
  <div class="screen">
    <div />
    <ShoeDisplay shoe={shoes.enemy} />
    <Shoe
      playerAttacking={playerAttacking}
      playerStopAttack={playerStopAttack}
      shoe={shoes.player}
    />
    <div />
  </div>
);
