import { h } from 'hyperapp';

export default ({ image, hp = { current: 0, max: 0 }, name }) => (
  <div>
    <img src={image} />
    <p>{name}</p>
    <progress value={hp.current} max={hp.max} />
  </div>
);
