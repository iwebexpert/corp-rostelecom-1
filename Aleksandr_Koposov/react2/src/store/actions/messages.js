export const MESSAGES_LOAD = 'MESSAGES_LOAD'
export const MESSAGE_SEND = 'MESSAGE_SEND'
export const MESSAGE_DEL = 'MESSAGE_DEL'

export const messagesLoadAction = () => ({
  type: MESSAGES_LOAD
})

export const messageSendAction = (payload) => ({
  type: MESSAGE_SEND,
  payload
})

export const messageDeleteAction = (chatId, messageId) => ({
  type: MESSAGE_DEL,
  payload: { chatId, messageId }
})
