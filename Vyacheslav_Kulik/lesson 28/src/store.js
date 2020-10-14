import { createStore, applyMiddleware } from 'redux'
import {rootReducer} from 'reducers'
import {composeWithDevTools} from 'redux-devtools-extension'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { apiMiddleware } from 'redux-api-middleware'
import thunk from 'redux-thunk';

import {botAnswersMiddleware} from './middlewares/bot'
export const history = createBrowserHistory()

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['chats', 'profile']
}

const persistedReducer = persistReducer(persistConfig, rootReducer(history))

export const store = createStore(persistedReducer, composeWithDevTools(
    applyMiddleware(
        thunk,
        apiMiddleware,
        routerMiddleware(history),
        botAnswersMiddleware
    )
))

export const persistor = persistStore(store)