import { h } from 'hyperapp';

export default ({
  shoe: {
    image, name, hp, type,
  },
}) => (
  <div>
    <img src={image} />
    <p>{`${name} - ${type}`}</p>
    <progress value={hp.current} max={hp.max} />
  </div>
);
