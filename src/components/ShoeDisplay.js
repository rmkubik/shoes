import { h } from 'hyperapp';

export default ({ image, hp, name }) => (
  <div>
    <img src={image} />
    <p>{name}</p>
    <progress value={hp.current} max={hp.max} />
  </div>
);
