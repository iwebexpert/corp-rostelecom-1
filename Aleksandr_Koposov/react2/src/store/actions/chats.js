export const CHATS_LOAD = 'CHATS_LOAD'
export const CHAT_ADD = 'CHAT_ADD'
export const CHAT_MESSAGE_SEND = 'CHAT_MESSAGE_SEND'

export const chatsLoadAction = () => ({
  type: CHATS_LOAD
})

export const chatAddAction = (payload, cb) => ({
  type: CHAT_ADD,
  payload,
  cb
})

export const chatMessageSendAction = (payload) => ({
  type: CHAT_MESSAGE_SEND,
  payload
})
