import { h } from 'hyperapp';

import ShopItem from './ShopItem';

export default ({ state, actions }) => (
  <div class="shopScene">
    <p>{`Money: ${state.player.money}`}</p>
    {state.map[state.currentMapIndex].items.map(({ name, cost, key }) => (
      <ShopItem
        name={name}
        purchaseItem={() => actions.purchaseItem({ key })}
        money={state.player.money}
        cost={cost}
      />
    ))}
    <button
      onclick={() => {
        actions.healAll();
        actions.changeScene({ newScene: 'MapScene', currentMapIndex: state.currentMapIndex + 1 });
      }}
    >
      Back
    </button>
  </div>
);
