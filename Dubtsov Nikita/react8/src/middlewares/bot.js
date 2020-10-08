import { nanoid } from "nanoid"
import { CHATS_MESSAGE_SEND, chatsMessageSendAction } from "../actions/chats"

export const botMiddleware = (store) => (next) => (action) => {
  if (action.type === CHATS_MESSAGE_SEND) {
    const { chatId, author } = action.payload
    if (author !== "Бот") {
      setTimeout(() => {
        store.dispatch(
          chatsMessageSendAction({
            chatId,
            author: "Бот",
            text: `Привет, ${author}, я Бот!`,
            id: nanoid(8),
          })
        )
      }, 3000)
    }
  }

  return next(action)
}
