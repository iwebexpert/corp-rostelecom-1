import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';

import { rootReducer } from 'reducers';
import { loggerMiddleware } from './middlewares/logger';
import { botMiddleware } from './middlewares/bot';

export const history = createBrowserHistory();



const persistConfig = {
    key: 'app',
    storage,

    blacklist: ['chats'],
};

export function initStore() {
    const initStateStore = {};

    const store = createStore(
        persistReducer(persistConfig, rootReducer(history)),
        initStateStore,
        composeWithDevTools(applyMiddleware(
            apiMiddleware,
            thunk,
            logger,

            botMiddleware,
            routerMiddleware(history),
        )));

    const persistor = persistStore(store);
    return { store, persistor };
}