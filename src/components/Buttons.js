import { h } from 'hyperapp';

export default ({
  playerAttack, moves, items, actions, itemList,
}) => (
  <div class="buttons">
    {moves.map((move, index) => (
      <button
        onclick={() => {
          if (move.uses.current > 0) {
            playerAttack({ damage: move.damage, index });
          }
        }}
      >
        {`${move.name} - ${move.uses.current}/${move.uses.max}`}
      </button>
    ))}
    {items.map(([itemName, itemCount]) => {
      const item = itemList[itemName];
      return <button onclick={actions[item.effect]}>{`${item.useText} - ${itemCount}`}</button>;
    })}
  </div>
);
// {wild && <button onclick={attemptCatch}>Throw Shoe Box</button>}
