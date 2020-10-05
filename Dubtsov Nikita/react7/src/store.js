import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { createBrowserHistory } from "history"
import { routerMiddleware } from "connected-react-router"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { apiMiddleware } from "redux-api-middleware"

import { rootReducer } from "reducers/index"
import { botMiddleware } from "./middlewares/bot"
import { chatFireMiddleware } from "./middlewares/chatFire"
import { chatUnfireMiddleware } from "./middlewares/chatUnfire"
export const history = createBrowserHistory()

const persistConfig = {
  key: "app",
  storage,
  blacklist: ["chats", "users"],
}
export function initStore() {
  const initStateStore = {}

  const store = createStore(
    persistReducer(persistConfig, rootReducer(history)),
    initStateStore,
    composeWithDevTools(
      applyMiddleware(
        apiMiddleware,
        chatFireMiddleware,
        chatUnfireMiddleware,
        botMiddleware,
        routerMiddleware(history)
      )
    )
  )

  const persistor = persistStore(store)
  return { store, persistor }
}
