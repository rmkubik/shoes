import { h } from 'hyperapp';

import { isAlive } from '../state/shoes';

export default ({
  playerAttack,
  moves,
  items,
  actions,
  itemList,
  playerShoes,
  playerAttacking,
  enemyAttacking,
  currentShoe,
}) => (
  <div class="buttons">
    {playerShoes.map((shoe, index) => (
      <div>
        <input
          type="radio"
          name="playerShoe"
          value={index}
          checked={index === currentShoe ? 'checked' : undefined}
          onchange={({ srcElement }) => {
            actions.changeCurrentShoeIndex({ index: parseInt(srcElement.value, 10) });
          }}
          disabled={!isAlive(shoe)}
        />
        <label>{shoe.name}</label>
      </div>
    ))}
    {moves.map((move, index) => (
      <button
        onclick={() => {
          if (move.uses.current > 0 && !playerAttacking && !enemyAttacking) {
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
