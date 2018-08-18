import { h } from 'hyperapp';

const attack = () => {
  const img = document.querySelector('#i2');
  img.addEventListener('animationend', () => {
    img.style.animationName = '';
  });
  img.style.animationName = 'attackToRight';
  img.style.animationDuration = '0.5s';
};

export default () => (
  <div class="buttons">
    <button onclick={attack} id="b1">
      Special Stomp
    </button>
    <button id="b2">Thunder Kick</button>
    <button id="b3">Crush</button>
    <button id="b4">Lick</button>
  </div>
);
