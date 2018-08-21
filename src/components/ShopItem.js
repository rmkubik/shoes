import { h } from 'hyperapp';

export default ({
  name, purchaseItem, cost, money,
}) => (
  <button
    onclick={() => {
      if (cost <= money) {
        purchaseItem();
      }
    }}
  >
    {`${name} - $${cost}`}
  </button>
);
