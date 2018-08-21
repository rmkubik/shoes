import { h } from 'hyperapp';

export default ({ name, changeScene }) => (
  <a
    href="/"
    onclick={(e) => {
      changeScene();
      e.preventDefault();
    }}
  >
    {name}
  </a>
);
