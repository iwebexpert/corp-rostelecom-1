import update from 'immutability-helper'

import {
  CHAT_ADD,
  CHAT_DEL,
  CHAT_MESSAGE_SEND,
  CHAT_MESSAGE_DEL,
  CHAT_SET_FLASH,
  CHAT_UNSET_FLASH,

  CHATS_LOAD_REQUEST,
  CHATS_LOAD_SUCCESS,
  CHATS_LOAD_FAILURE,
} from 'actions/chats'

const initialState = {
  entries: [],
  loading: false,
  error: false,
  init: false
}

export const chatsReducer = (state = initialState, action) => {
  const chatIndex = state.entries
    .map(i => i.id)
    .indexOf((action.payload || {}).chatId || '')

  switch (action.type) {

    case CHATS_LOAD_REQUEST:
      return { ...state, loading: true, error: false }

    case CHATS_LOAD_SUCCESS:
      return { ...state, loading: false, entries: action.payload }

    case CHATS_LOAD_FAILURE:
      return { ...state, loading: false, error: true }

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
              $push: [action.payload.message]
            }
          }
        }
      })

    case CHAT_MESSAGE_DEL:
      if (chatIndex < 0) {
        return state
      }
      const chat = state.entries[chatIndex]
      return update(state, {
        entries: {
          [chatIndex]: {
            messages: {
              $set: chat.messages.filter(i => i.id !== action.payload.messageId)
            }
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
