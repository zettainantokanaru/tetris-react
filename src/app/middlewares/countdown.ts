import * as ActionTypes from '../constants/action-types';
import { push } from 'connected-react-router';

let timer: any;
let limit = 20;

let interval = 2000;

export const countdown = (store: any) => (next: any) => (action: any) => {
    if (action.type && action.type === ActionTypes.ACTION_GAME_START) {
        clearInterval(timer);
    }
    next(action);
};

function loop(store: any) {
    limit--;
    if (limit > 0) {
        timer = setTimeout (() => {
            store.dispatch({type: ActionTypes.ACTION_COUNT_DOWN});
            loop(store);
        }, interval);
    }
    if (limit % 4 === 0) {
        interval = interval - 400;
    }
}