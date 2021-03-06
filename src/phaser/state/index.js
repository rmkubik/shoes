import items from './items';
import map from './map';
import moves from './moves';
import shoes from './shoes';
import player from './player';
import types from './types';
import stats from './stats';

export default {
  acting: false,
  phaserCanvas: null,
  currentMapIndex: 0,
  currentEncounterIndex: 0,
  moves,
  shoes,
  player,
  types,
  map,
  items,
  stats,
};
