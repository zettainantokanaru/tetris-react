import * as ActionTypes from '../constants/action-types';
import { push } from 'connected-react-router';

export const transition = (store: any) => (next: any) => (action: any) => {
    if (action.type && action.type === ActionTypes.ACTION_SELECT_MODE) {
        store.dispatch(push('/game'));
    }
    next(action);
};