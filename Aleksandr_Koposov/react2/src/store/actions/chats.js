import { MESSAGE_DEL } from 'actions/messages'

export const CHATS_LOAD = 'CHATS_LOAD'
export const CHAT_ADD = 'CHAT_ADD'
export const CHAT_DEL = 'CHAT_DEL'
export const CHAT_MESSAGE_SEND = 'CHAT_MESSAGE_SEND'
export const CHAT_MESSAGE_DEL = 'CHAT_MESSAGE_DEL'
export const CHAT_SET_FLASH = 'CHAT_SET_FLASH'
export const CHAT_UNSET_FLASH = 'CHAT_UNSET_FLASH'

export const chatsLoadAction = () => ({
  type: CHATS_LOAD
})

export const chatAddAction = (payload) => ({
  type: CHAT_ADD,
  payload
})

export const chatMessageSendAction = (payload) => ({
  type: CHAT_MESSAGE_SEND,
  payload
})

export const chatFlashAction = (chatId) => ({
  type: CHAT_SET_FLASH,
  payload: { chatId }
})

export const chatUnFlashAction = (chatId) => ({
  type: CHAT_UNSET_FLASH,
  payload: { chatId }
})

export const chatDeleteAction = (chatId) => ({
  type: CHAT_DEL,
  payload: { chatId }
})

export const chatDeleteMessageAction = (chatId, messageId) => ({
  type: CHAT_MESSAGE_DEL,
  payload: { chatId, messageId }
})
