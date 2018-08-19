import { h } from 'hyperapp';

import MapLink from './MapLink';

export default ({ state, actions }) => (
  <div class="mapScene">
    <h3> Route 5 </h3>
    <ol>
      <li>
        <MapLink name="Wild Shoe!" changeScene={actions.changeScene} />
      </li>
      <li> Wild Shoe! </li>
      <li> Trainer Battle </li>
      <li> Shop </li>
      <li> Wild Shoe! </li>
      <li> Wild Shoe! </li>
      <li> Trainer Battle </li>
      <li> Shop </li>
      <li> Final Four </li>
    </ol>
  </div>
);
