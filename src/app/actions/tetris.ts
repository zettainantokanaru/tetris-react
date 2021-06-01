import * as ActionTypes from '../constants/action-types';
import { TetrisTableInfo } from '../model/tetris-table-info'; 

export interface Start {
  type: ActionTypes.ACTION_GAME_START,
}
export function onStart(): Start {
  return {
    type: ActionTypes.ACTION_GAME_START,
  };
};

export interface Pause {
  type: ActionTypes.ACTION_GAME_PAUSE,
}
export function onPause(): Pause {
  return {
    type: ActionTypes.ACTION_GAME_PAUSE,
  };
};

export interface Finish {
  type: ActionTypes.ACTION_GAME_FINISH,
  method?: string,
}
export function onFinish(method?: string): Finish {
  return {
    type: ActionTypes.ACTION_GAME_FINISH,
    method
  };
};

export interface Refresh {
  type: ActionTypes.ACTION_REFRESH,
}
export function onRefresh(): Refresh {
  return {
    type: ActionTypes.ACTION_REFRESH,
  };
};

export interface DeleteLines {
  type: ActionTypes.ACTION_DELETE_LINES,
  lines: number,
  level: number,
}
export function onDeleteLines(lines: number, level: number): DeleteLines {
  return {
    type: ActionTypes.ACTION_DELETE_LINES,
    lines,
    level,
  };
};

export interface CountDown {
  type: ActionTypes.ACTION_COUNT_DOWN,
}
export function onCountDown(): CountDown {
  return {
    type: ActionTypes.ACTION_COUNT_DOWN,
  };
};

export interface Update {
  type: ActionTypes.ACTION_UPDATE,
  value: TetrisTableInfo,
}
export function update(value: TetrisTableInfo): Update {
  return {
    type: ActionTypes.ACTION_UPDATE,
    value,
  };
};

export interface KeyDown {
  type: ActionTypes.ACTION_KEY_DOWN,
  code: number,
}
export function onKeyDown(code: number): KeyDown {
  return {
    type: ActionTypes.ACTION_KEY_DOWN,
    code
  };
};

export type actions =  Start | Pause | Finish | Refresh | DeleteLines | CountDown | Update | KeyDown;