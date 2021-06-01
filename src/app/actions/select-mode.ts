import * as ActionTypes from '../constants/action-types';

interface SelectMode {
  type: ActionTypes.ACTION_SELECT_MODE,
  mode: string,
}

export function onSelectMode(mode: string): SelectMode {
  return {
    type: ActionTypes.ACTION_SELECT_MODE,
    mode,
  };
};

export type actions = SelectMode;