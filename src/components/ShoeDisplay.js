import { h } from 'hyperapp';

export default ({ shoe: { image, name, hp } }) => (
  <div>
    <img src={image} />
    <p>{name}</p>
    <progress value={hp.current} max={hp.max} />
  </div>
);
