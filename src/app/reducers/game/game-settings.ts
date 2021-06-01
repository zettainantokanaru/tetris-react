import * as ActionTypes from '../../constants/action-types';
import * as TetrisAction from '../../actions/tetris';
import { Level, NormaLines } from '../../constants/tetris';

const initialAppState = {
  speed: Level.NORMAL,
  deleted: 0,
  step: 1,
};

const GameSettingsReducer = (state = initialAppState, action: TetrisAction.actions) => {
  if (action.type === ActionTypes.ACTION_DELETE_LINES) {
    const deleted = state.deleted + action.lines;
    let newLevel = state.speed;
    let newStep = state.step;
    if (deleted > 0 && deleted > (NormaLines * newStep)) {
      if (state.speed === Level.NORMAL) {
        newLevel = Level.HARD;
        newStep++;
      } else if (state.speed === Level.HARD) {
        newLevel = Level.VERYHARD;
        newStep++;
      } else if (state.speed === Level.VERYHARD) {
        newLevel = Level.TOOHARD;
        newStep++;
      }
    }
    return {
      ...state,
      deleted: deleted,
      speed: newLevel,
      step: newStep,
    };
  } else if (action.type === ActionTypes.ACTION_REFRESH) {
    return initialAppState;
  } else {
    return state;
  }
};

export default GameSettingsReducer;