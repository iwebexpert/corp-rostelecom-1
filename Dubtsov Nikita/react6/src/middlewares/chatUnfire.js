import { LOCATION_CHANGE } from "connected-react-router"
import { chatsUnfireAction } from "../actions/chats"

export const chatUnfireMiddleware = (store) => (next) => (action) => {
  if (action.type === LOCATION_CHANGE) {
    const chatId = action.payload.location.pathname.slice(7)
    const chatFire = store.getState().chats.entries[chatId].fire
    if (chatFire) {
      store.dispatch(chatsUnfireAction(chatId, chatFire))
    }
  }

  return next(action)
}
