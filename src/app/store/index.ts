import { createStore, compose } from 'redux';
import createRootReducer from '../reducers';
import createMiddlewares from '../middlewares';
import { createBrowserHistory } from 'history';

/**
 * Store定義
 * 基本的に変更しない
 */

 export const history = createBrowserHistory();

function configureStore() {
    const store = createStore(
        createRootReducer(history),
        compose(
            createMiddlewares(history)
        )
    );
    return store;
}

const store = configureStore();

export default store;