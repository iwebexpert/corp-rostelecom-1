import { nanoid } from 'nanoid'
import { CHAT_MESSAGE_SEND, chatFlashAction } from 'actions/chats'
import { messageSendAction } from 'actions/messages'

let botWriting = [] // Можно, конечно, менять флаг у чата или проверять длину

export const botMiddleware = store => next => action => {
  if (action.type === CHAT_MESSAGE_SEND) {
    const { chatId, message } = action.payload
    const user = store.getState().profile.entries.name || 'Аноним'

    if (!botWriting.includes(chatId) && message.author !== 'bot') {
      botWriting.push(chatId)
      setTimeout(() => {
        const data = {
          chatId,
          message: {
            id: nanoid(),
            author: 'bot',
            text: `Привет, ${user}! Это бот.`
          }
        }
        store.dispatch(messageSendAction(data))

        const pathname = store.getState().router.location.pathname || ''
        const pathParts = pathname.match(/\/chats\/(.*?)$/) || []
        const activeChatId = pathParts[1] || ''
        if (chatId !== activeChatId) {
          store.dispatch(chatFlashAction(chatId))
        }

        botWriting = botWriting.filter(i => i !== chatId)
      }, 3000)
    }
  }
  return next(action)
}
