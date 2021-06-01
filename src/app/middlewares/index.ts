import { applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';

import { logger } from './logger';
import { transition } from './transition';
import { boardDrawer } from './board-drawer';
import { countdown } from './countdown';

/**
 * Middleware設定
 * MIddlewareが追加・削除された場合はここに記載
 */
const createMiddlewares = (history: any) => applyMiddleware(
    routerMiddleware(history),
    transition,
    countdown,
    boardDrawer,
    logger,
)

export default createMiddlewares;