import { nanoid } from 'nanoid'
import { createAction } from 'redux-api-middleware'

export const CHAT_SET_FLASH = 'CHAT_SET_FLASH'
export const CHAT_UNSET_FLASH = 'CHAT_UNSET_FLASH'

export const CHATS_LOAD_REQUEST = 'CHATS_LOAD/CHATS_LOAD_REQUEST'
export const CHATS_LOAD_SUCCESS = 'CHATS_LOAD/CHATS_LOAD_SUCCESS'
export const CHATS_LOAD_FAILURE = 'CHATS_LOAD/CHATS_LOAD_FAILURE'

export const CHAT_DEL = 'CHAT_DEL'
export const CHAT_DEL_REQUEST = 'CHATS_LOAD/CHAT_DEL_REQUEST'
export const CHAT_DEL_SUCCESS = 'CHATS_LOAD/CHAT_DEL_SUCCESS'
export const CHAT_DEL_FAILURE = 'CHATS_LOAD/CHAT_DEL_FAILURE'

export const CHAT_MESSAGE_DEL = 'CHAT_MESSAGE_DEL'
export const CHAT_MESSAGE_DEL_REQUEST = 'CHATS_LOAD/CHAT_MESSAGE_DEL_REQUEST'
export const CHAT_MESSAGE_DEL_SUCCESS = 'CHATS_LOAD/CHAT_MESSAGE_DEL_SUCCESS'
export const CHAT_MESSAGE_DEL_FAILURE = 'CHATS_LOAD/CHAT_MESSAGE_DEL_FAILURE'

export const CHAT_ADD = 'CHAT_ADD'
export const CHAT_ADD_REQUEST = 'CHATS_LOAD/CHAT_ADD_REQUEST'
export const CHAT_ADD_SUCCESS = 'CHATS_LOAD/CHAT_ADD_SUCCESS'
export const CHAT_ADD_FAILURE = 'CHATS_LOAD/CHAT_ADD_FAILURE'

export const CHAT_MESSAGE_SEND = 'CHAT_MESSAGE_SEND'
export const CHAT_MESSAGE_ADD_REQUEST = 'CHATS_LOAD/CHAT_MESSAGE_ADD_REQUEST'
export const CHAT_MESSAGE_ADD_SUCCESS = 'CHATS_LOAD/CHAT_MESSAGE_ADD_SUCCESS'
export const CHAT_MESSAGE_ADD_FAILURE = 'CHATS_LOAD/CHAT_MESSAGE_ADD_FAILURE'


export const chatsLoadRequestAction = () => ({
  type: CHATS_LOAD_REQUEST,
})

export const chatsLoadSuccessAction = (data) => ({
  type: CHATS_LOAD_SUCCESS,
  payload: data,
})

export const chatsLoadFailureAction = (error) => ({
  type: CHATS_LOAD_FAILURE,
  payload: error,
})

export const chatsLoadAction = () => {
  return async (dispatch) => {
    try {
      dispatch(chatsLoadRequestAction())
      await new Promise(resolve => setTimeout(resolve, 1000)) // Эмуляция загрузки
      const result = await fetch('/api/chats?_embed=messages')
      dispatch(chatsLoadSuccessAction(await result.json()))
    } catch (error) {
      dispatch(chatsLoadFailureAction(error))
    }
  }
}


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

export const chatDeleteApiAction = (index, chatId) => createAction({
  endpoint: `/api/chats/${chatId}`,
  method: 'DELETE',
  types: [
    {
      type: CHAT_DEL_REQUEST,
      payload: chatId
    },
    {
      type: CHAT_DEL_SUCCESS,
      payload: { chatId: index, chatId }
    },
    CHAT_DEL_FAILURE
  ]
})


export const chatDeleteMessageAction = (chatId, messageId) => ({
  type: CHAT_MESSAGE_DEL,
  payload: { chatId, messageId }
})

export const chatDeleteMessageApiAction = (messageId, messageIndex, chatId) => createAction({
  endpoint: `/api/messages/${messageId}`,
  method: 'DELETE',
  types: [
    {
      type: CHAT_MESSAGE_DEL_REQUEST,
      payload: messageId
    },
    {
      type: CHAT_MESSAGE_DEL_SUCCESS,
      payload: { messageId, messageIndex, chatId }
    },
    CHAT_MESSAGE_DEL_FAILURE
  ]
})


export const chatAddAction = (payload) => ({
  type: CHAT_ADD,
  payload
})

export const chatAddApiAction = (payload) => createAction({
  endpoint: '/api/chats',
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
  types: [
    CHAT_ADD_REQUEST,
    {
      type: CHAT_ADD_SUCCESS,
      payload: async (action, state, res) => await res.json()
    },
    CHAT_ADD_FAILURE
  ]
})


export const chatMessageSendAction = (payload) => ({
  type: CHAT_MESSAGE_SEND,
  payload
})

export const chatMessageSendApiAction = (chatId, message) => createAction({
  endpoint: '/api/messages',
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    ...message,
    chatId
  }),
  types: [
    {
      type: CHAT_MESSAGE_ADD_REQUEST,
      payload: { ...message, chatId: parseInt(chatId) }
    },
    {
      type: CHAT_MESSAGE_ADD_SUCCESS,
      payload: async (action, state, res) => await res.json()
    },
    CHAT_MESSAGE_ADD_FAILURE
  ]
})
