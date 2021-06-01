import * as ActionTypes from '../../constants/action-types';
import * as TetrisAction from '../../actions/tetris';

const initialAppState = {
  playing: true,
};

const GameStatusReducer = (state = initialAppState, action: TetrisAction.actions) => {
  if (action.type === ActionTypes.ACTION_GAME_PAUSE) {
    const newPlaying = !state.playing;
    return {
      ...state,
      playing: newPlaying,
    };
  } else {
    return state;
  }
};

export default GameStatusReducer;