import { h } from 'hyperapp';

export default ({
  playerAttacking, playerStopAttack, image, hp, name,
}) => (
  <div
    className={playerAttacking ? 'attackToRight' : ''}
    oncreate={(element) => {
      element.addEventListener('animationend', () => {
        playerStopAttack();
      });
    }}
  >
    <img src={image} />
    <p>{name}</p>
    <progress value={hp.current} max={hp.max} />
  </div>
);
