import { h } from 'hyperapp';

export default ({
  shoe: {
    image, name, hp, stats,
  },
}) => (
  <div>
    <img src={image} />
    <p>{`${name} - 🗡${stats.attack.current} - 🛡${stats.defense.current}`}</p>
    <progress value={hp.current} max={hp.max} />
    <p>{`HP: ${hp.current}/${hp.max}`}</p>
  </div>
);
