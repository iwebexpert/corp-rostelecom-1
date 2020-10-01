import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { rootReducer } from 'reducers'
import { botMiddleware } from 'middlewares/bot'
import { locationChange } from 'middlewares/locationChange'
import { chatAddMessageMiddleware } from 'middlewares/chatAddMessage'
import { deleteMessageMiddleware } from 'middlewares/deleteMessage'

export const history = createBrowserHistory()

const persistConfig = {
  key: 'app',
  storage
}

export function initStore(){
  const initStateStore = {}

  const store = createStore(
    persistReducer(persistConfig, rootReducer(history)),
    initStateStore,
    composeWithDevTools(applyMiddleware(
      botMiddleware,
      locationChange,
      chatAddMessageMiddleware,
      deleteMessageMiddleware,
      routerMiddleware(history),
    )))

  const persist = persistStore(store)
  return { store, persist }
}
