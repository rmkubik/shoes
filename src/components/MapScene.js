import { h } from 'hyperapp';

import MapItem from './MapItem';

const status = {
  finished: '✅',
  current: '⬅️',
  locked: '🔒',
};

const getStatusIcon = (state, index) => {
  if (index < state.currentMapIndex) {
    return status.finished;
  } else if (index > state.currentMapIndex) {
    return status.locked;
  }
  return status.current;
};

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
              })
            }
            icon={getStatusIcon(state, index)}
          />
        </li>
      ))}
      <li> Final Four </li>
    </ol>
  </div>
);
