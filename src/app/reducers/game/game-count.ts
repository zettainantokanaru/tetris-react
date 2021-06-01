import * as ActionTypes from '../../constants/action-types';
import * as TetrisAction from '../../actions/tetris';

const initialAppState = {
  count: 3,
};


let myState: any;

const GameCountReducer = (state = initialAppState, action: TetrisAction.actions) => {
  myState = state;
  if (action.type === ActionTypes.ACTION_COUNT_DOWN) {
    countUp();
    return state;
  } else if (action.type === ActionTypes.ACTION_GAME_START) {
    return initialAppState;
  } else {
    return state;
  }
};

function countUp () {
  myState.count--;
}

export default GameCountReducer;