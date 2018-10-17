/**
 *  {
 *      state1: {
 *          action1: callback1
 *          action2: callback2
 *      },
 *      state2: {
 *          action1: callback1
 *      }
 *  }
 */

class Fsm {
  constructor(states, initialState) {
    this.currentState = initialState;
    this.states = states;
  }

  action(action) {
    if (this.states[this.currentState][action]) {
      this.states[this.currentState][action]();
    }
  }

  transition(state) {
    this.currentState = state;
  }
}

export default Fsm;
