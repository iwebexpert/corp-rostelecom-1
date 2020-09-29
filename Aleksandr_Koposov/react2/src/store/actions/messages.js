export const MESSAGES_LOAD = 'MESSAGES_LOAD'
export const MESSAGE_SEND = 'MESSAGE_SEND'

export const messagesLoadAction = () => ({
  type: MESSAGES_LOAD
})

export const messageSendAction = (payload) => ({
  type: MESSAGE_SEND,
  payload
})
