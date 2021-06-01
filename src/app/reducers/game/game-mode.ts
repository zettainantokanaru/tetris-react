import * as ActionTypes from '../../constants/action-types';
import * as SelectModeAction from '../../actions/select-mode';
import { GameMode } from '../../constants/tetris';

const initialAppState = {
  currentMode: GameMode.DEFAULT,
};

const GameModeReducer = (state = initialAppState, action: SelectModeAction.actions) => {
  if (action.type === ActionTypes.ACTION_SELECT_MODE) {
    return {
      ...state,
      currentMode: action.mode,
    };
  } else {
    return state;
  }
};

export default GameModeReducer;