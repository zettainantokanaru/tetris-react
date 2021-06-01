import * as ActionTypes from '../../constants/action-types';
import * as TetrisAction from '../../actions/tetris';
import { Level } from '../../constants/tetris';

const initialAppState = {
  // 消したライン数
  deletedLineNumber: 0,
  // 点数
  point: 0,
  // メッセージ
  message: '',
};

const GameScoreReducer = (state = initialAppState, action: TetrisAction.actions) => {
  if (action.type === ActionTypes.ACTION_DELETE_LINES && action.lines) {
    return {
      ...state,
      deletedLineNumber: state.deletedLineNumber + action.lines,
      point: state.point + calculate(action.lines, action.level),
    };
  } else if (action.type === ActionTypes.ACTION_REFRESH) {
    return initialAppState;
  } else {
    return state;
  }
};

function calculate(lines: number, level: number) {
  let speedWeight = 1;
  if (level === Level.NORMAL) {
    speedWeight = 2;
  } else if (level === Level.HARD) {
    speedWeight = 3;
  } else if (level === Level.VERYHARD) {
    speedWeight = 5;
  } else if (level === Level.TOOHARD) {
    speedWeight = 7;
  } else if (level === Level.VERYEASY) {
    speedWeight = 0.5;
  } else if (level === Level.TOOEASY) {
    speedWeight = 0.25;
  }

  let linesWeight = 1;
  if (lines === 2) {
    linesWeight = 2;
  } else if (lines === 3) {
    linesWeight = 4;
  } else if (lines >= 4 ) {
    linesWeight = 8;
  }

  return 100 * speedWeight * linesWeight;
}

export default GameScoreReducer;