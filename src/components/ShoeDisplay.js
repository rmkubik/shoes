import { h } from 'hyperapp';

export default ({
  shoe: {
    image, name, hp, stats,
  }, flip,
}) => (
  <div>
    <img src={image} style={flip ? { transform: 'scaleX(-1)' } : {}} />
    <p>{`${name} - 🗡${stats.attack.current} - 🛡${stats.defense.current}`}</p>
    <progress value={hp.current} max={hp.max} />
    <p>{`HP: ${hp.current}/${hp.max}`}</p>
  </div>
);
