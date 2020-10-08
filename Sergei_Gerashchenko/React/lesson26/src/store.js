import {createStore, applyMiddleware} from 'redux';
import {rootReducer} from "./redures";
import { composeWithDevTools } from 'redux-devtools-extension';
import {botMiddleware} from './middleware/bot'

import {routerMiddleware} from 'connected-react-router';

import {createBrowserHistory} from 'history';

export const history = createBrowserHistory();

import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { apiMiddleware } from 'redux-api-middleware';

// export const store =  createStore(rootReducer(history), composeWithDevTools(applyMiddleware(
//     botMiddleware,
//     routerMiddleware(history)
// )));

const persistConfig = {
    key: 'app',
    storage,
    //whitelist: ['chats'],
    blacklist: ['chats'],
};

export function initStore(){
    const initStateStore = {};

    const store = createStore(
        persistReducer(persistConfig, rootReducer(history)),
        initStateStore,
        composeWithDevTools(applyMiddleware(
            apiMiddleware,
            botMiddleware,
            routerMiddleware(history),
        )));

    const persistor = persistStore(store);
    return {store, persistor};
}