import update from 'react-addons-update'

import {
  CHATS_LOAD,
  CHAT_ADD,
  CHAT_DEL,
  CHAT_MESSAGE_SEND,
  CHAT_MESSAGE_DEL,
  CHAT_SET_FLASH,
  CHAT_UNSET_FLASH
} from 'actions/chats'

import { chats } from 'helpers/chatsData'

const initialState = {
  entries: [],
  loading: false,
  init: false
}

export const chatsReducer = (state = initialState, action) => {
  const chatIndex = state.entries
    .map(i => i.id)
    .indexOf((action.payload || {}).chatId || '')

  switch (action.type) {
    case CHATS_LOAD:
      return !state.init
        ? {
          ...state,
          init: true,
          entries: chats,
        }
        : {
          ...state
        }

    case CHAT_ADD:
      return update(state, {
        entries: {
          $push: [action.payload]
        }
      })

    case CHAT_DEL:
      return update(state, {
        entries: {
          $set: state.entries.filter(i => i.id !== action.payload.chatId)
        }
      })

    case CHAT_MESSAGE_SEND:
      if (chatIndex < 0) {
        return state
      }
      return update(state, {
        entries: {
          [chatIndex]: {
            messages: {
              $push: [action.payload.message.id]
            }
          }
        }
      })

    case CHAT_MESSAGE_DEL:
      if (chatIndex < 0) {
        return state
      }
      const chat = state.entries[chatIndex]
      chat.messages = chat.messages.filter(i => i !== action.payload.messageId)
      return update(state, {
        entries: {
          [chatIndex]: {
            $set: chat
          }
        }
      })

    case CHAT_SET_FLASH:
      if (chatIndex < 0) {
        return state
      }
      return update(state, {
        entries: {
          $merge: {
            [chatIndex]: {
              ...state.entries[chatIndex],
              flash: true
            }
          }
        }
      })

    case CHAT_UNSET_FLASH:
      if (chatIndex < 0) {
        return state
      }
      return update(state, {
        entries: {
          $merge: {
            [chatIndex]: {
              ...state.entries[chatIndex],
              flash: false
            }
          }
        }
      })

    default:
      return state
  }
}
