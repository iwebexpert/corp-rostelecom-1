import { chatMessageSendAction } from 'actions/chats'
import { MESSAGE_SEND } from 'actions/messages'

export const chatAddMessageMiddleware = store => next => action => {
  if (action.type === MESSAGE_SEND) {
    store.dispatch(chatMessageSendAction(action.payload))
  }
  return next(action)
}
