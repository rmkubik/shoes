import moves from './moves';
import shoes from './shoes';
import player from './player';
import types from './types';

export default {
  turn: 0,
  playerAttacking: false,
  scene: 'battle',
  enemy: shoes.highHeel,
  moves,
  shoes,
  player,
  types,
};
