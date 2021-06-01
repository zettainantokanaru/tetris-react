import * as ActionTypes from '../../constants/action-types';
import * as TetrisAction from '../../actions/tetris';
import { BoardSize } from '../../constants/tetris';

const initialAppState = {
  // メインスクリーン
  boardTable: create2DArray(BoardSize.STAGE_HEIGHT, BoardSize.STAGE_WIDTH),
  currentBlock: null as any,
  // ネクストブロック表示スクリーン
  nextTable: create2DArray(BoardSize.NEXTAREA_WIDTH, BoardSize.NEXTAREA_HEIGHT),
  nextBlock: null as any,

  virtualStage: create2DArray(BoardSize.STAGE_WIDTH, BoardSize.STAGE_HEIGHT),
};

const GameBoardReducer = (state = initialAppState, action: TetrisAction.actions) => {
  if (action.type === ActionTypes.ACTION_UPDATE) {
    state = action.value;
    return state;
  } else {
    return state;
  }
};

function create2DArray(rows: number, cols: number) {
  let array = new Array(rows);
  for (let i = 0; i < rows; i++) {
      array[i] = new Array(cols).fill(null);
  }
  return array;
}

export default GameBoardReducer;