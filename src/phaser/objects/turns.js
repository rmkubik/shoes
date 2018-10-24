class Turns {
  constructor() {
    this.order = ['player', 'enemy'];
    this.current = 0;
  }

  isLastTurnInRound() {
    return this.current > this.order.length - 1;
  }

  nextTurn() {
    this.current = this.isLastTurnInRound() ? 0 : this.current + 1;
  }

  isEnemyTurn() {
    return this.order[this.current];
  }
}

export default Turns;
