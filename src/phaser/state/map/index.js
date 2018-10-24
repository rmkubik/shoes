import state from './state';

import { isAlive } from '../shoes';

class Map {
  constructor() {
    this.state = state;
  }

  getCurrentEnemy() {
    const currentMapItem = this.state.map[this.state.currentMapIndex];
    return currentMapItem.enemies[currentMapItem.currentEnemyIndex];
  }

  getCurrentPlayerShoe() {
    return this.state.player.shoes[this.state.player.currentShoe];
  }

  getNextEnemyIndex() {
    const currentMapItem = this.state.map[this.state.currentMapIndex];
    return currentMapItem.enemies.findIndex(isAlive);
  }

  isPlayerTurn() {
    const currentMapItem = this.state.map[this.state.currentMapIndex];
    return currentMapItem.playerFirst
      ? currentMapItem.turn % 2 === 0
      : currentMapItem.turn % 2 === 1;
  }

  static allShoesDead(shoeList) {
    return shoeList.every(shoe => shoe.hp.current <= 0);
  }

  isEncounterOver(index) {
    return Map.allShoesDead(this.state.map[index].enemies)
      || Map.allShoesDead(this.state.player.shoes);
  }

  isCurrentEncounterOver() {
    return this.isEncounterOver(this.state, this.state.currentMapIndex);
  }
}

export default Map;
