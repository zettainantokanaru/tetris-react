import { combineReducers } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import GameModeReducer from './game/game-mode';
import GameCountReducer from './game/game-count';
import GameBoardReducer from './game/game-board';
import GameScoreReducer from './game/game-score';
import GameSettingsReducer from './game/game-settings';
import GameStatusReducer from './game/game-status';

/**
 * Reducer設定
 * Reducerが追加・削除された場合はここに記載
 */
const createRootReducer = (history: any) => combineReducers({
  router: connectRouter(history),
  mode: GameModeReducer,
  status: GameStatusReducer,
  board: GameBoardReducer,
  score: GameScoreReducer,
  settings: GameSettingsReducer,
  GameCountReducer,
});

export default createRootReducer;