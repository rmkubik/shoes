import { h } from 'hyperapp';

import MapItem from './MapItem';

export default ({ state, actions }) => (
  <div class="mapScene">
    <h3> Route 5 </h3>
    <ol>
      {state.map.map(({ name, scene }, index) => (
        <li>
          <MapItem
            name={name}
            changeScene={() =>
              actions.changeScene({
                newScene: scene,
                currentMapIndex: index,
              })
            }
          />
        </li>
      ))}
      <li> Shop </li>
      <li> Wild Shoe! </li>
      <li> Wild Shoe! </li>
      <li> Trainer Battle </li>
      <li> Shop </li>
      <li> Final Four </li>
    </ol>
  </div>
);
