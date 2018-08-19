import { h } from 'hyperapp';

export default ({ name, changeScene }) => (
  <a
    href="/"
    onclick={(e) => {
      changeScene({ newScene: 'BattleScene' });
      e.preventDefault();
    }}
  >
    {name}
  </a>
);
