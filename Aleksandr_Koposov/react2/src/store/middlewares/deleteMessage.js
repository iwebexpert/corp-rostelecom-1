import { chatDeleteMessageAction } from 'actions/chats'
import { MESSAGE_DEL } from 'actions/messages'

export const deleteMessageMiddleware = store => next => action => {
  if (action.type === MESSAGE_DEL) {
    store.dispatch(chatDeleteMessageAction(action.payload.chatId, action.payload.messageId))
  }
  return next(action)
}
