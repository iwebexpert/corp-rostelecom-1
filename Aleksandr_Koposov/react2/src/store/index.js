import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { apiMiddleware } from 'redux-api-middleware'
import thunk from 'redux-thunk'

import { rootReducer } from 'reducers'
import { botMiddleware } from 'middlewares/bot'
import { locationChange } from 'middlewares/locationChange'

export const history = createBrowserHistory()

const persistConfig = {
  key: 'app',
  storage,
  blacklist: ['chats', 'messages'],
}

export function initStore(){
  const initStateStore = {}

  const store = createStore(
    persistReducer(persistConfig, rootReducer(history)),
    initStateStore,
    composeWithDevTools(applyMiddleware(
      apiMiddleware,
      thunk,
      botMiddleware,
      locationChange,
      routerMiddleware(history),
    )))

  const persist = persistStore(store)
  return { store, persist }
}
