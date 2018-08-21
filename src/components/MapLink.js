import { h } from 'hyperapp';

export default ({ name, changeScene, index }) => (
  <a
    href="/"
    onclick={(e) => {
      changeScene({ newScene: 'BattleScene', currentMapIndex: index });
      e.preventDefault();
    }}
  >
    {name}
  </a>
);
