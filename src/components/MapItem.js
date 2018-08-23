import { h } from 'hyperapp';

export default ({ name, changeScene, icon }) => (
  <div class="mapItem">
    <a
      href="/"
      onclick={(e) => {
        changeScene();
        e.preventDefault();
      }}
    >
      {name}
    </a>
    <p>{icon}</p>
  </div>
);
