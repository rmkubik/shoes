import { h } from 'hyperapp';

import Shoe from './Shoe';
import ShoeDisplay from './ShoeDisplay';

export default ({ playerAttacking, playerStopAttack }) => (
  <div class="screen">
    <div />
    <ShoeDisplay
      image={'https://r-k.io/assets/images/ssj18parody/shoes_0.png'}
      name={'Boot'}
      hp={{
        current: 45,
        max: 100,
      }}
    />
    <Shoe
      playerAttacking={playerAttacking}
      playerStopAttack={playerStopAttack}
      image={'https://r-k.io/assets/images/ssj18parody/shoes_1.png'}
      name={'High Heel'}
      hp={{
        current: 22,
        max: 100,
      }}
    />
    <div />
  </div>
);
