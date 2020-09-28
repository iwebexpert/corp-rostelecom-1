import update from 'react-addons-update'

import { CHATS_LOAD, CHAT_ADD, CHAT_MESSAGE_SEND } from 'actions/chats'

import { chats } from 'helpers/chatsData'

const initialState = {
  entries: [],
  loading: false,
  init: false
}

export const chatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHATS_LOAD:
      const initState = !state.init
        ? {
          ...state,
          init: true,
          entries: chats,
        }
        : {
          ...state
        }
      if (action.cb && typeof action.cb === 'function') {
        action.cb(chats[0].id)
      }
      return initState

    case CHAT_ADD:
      const newState = update(state, {
        entries: {
          $push: [action.payload]
        }
      })
      if (action.cb && typeof action.cb === 'function') {
        action.cb(action.payload.id)
      }
      return newState

    case CHAT_MESSAGE_SEND:
      const chatIndex = state.entries.map(i => i.id).indexOf(action.payload.chatId)
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

    default:
      return state
  }
}
