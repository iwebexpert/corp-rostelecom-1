import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { rootReducer } from 'reducers';
import { loggerMiddleware } from './middlewares/logger';
import { botMiddleware } from './middlewares/bot';

export const history = createBrowserHistory();

// export const store = createStore(rootReducer(history), composeWithDevTools(applyMiddleware(
//     logger,
//     //loggerMiddleware, 
//     botMiddleware,
//     routerMiddleware(history),
//     )));

const persistConfig = {
    key: 'app',
    storage,
    //whitelist: ['chats'],
};

export function initStore() {
    const initStateStore = {};

    const store = createStore(
        persistReducer(persistConfig, rootReducer(history)),
        initStateStore,
        composeWithDevTools(applyMiddleware(
            logger,
            //loggerMiddleware, 
            botMiddleware,
            routerMiddleware(history),
        )));

    const persistor = persistStore(store);
    return { store, persistor };
}