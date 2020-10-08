import { chatsFireAction, CHATS_MESSAGE_SEND } from "../actions/chats"

export const chatFireMiddleware = (store) => (next) => (action) => {
  if (action.type === CHATS_MESSAGE_SEND) {
    const chatId = action.payload.chatId
    if (store.getState().chats.entries[chatId]) {
      const currentLocation = store.getState().router.location.pathname.slice(7)

      const chatFire = store.getState().chats.entries[chatId].fire
      if (currentLocation != action.payload.chatId) {
        store.dispatch(chatsFireAction(chatId, chatFire))
      }
    }
  }

  return next(action)
}
