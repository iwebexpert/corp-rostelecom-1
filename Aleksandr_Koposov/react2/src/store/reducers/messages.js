import update from 'react-addons-update'

import { MESSAGES_LOAD, MESSAGE_SEND, MESSAGE_DEL } from 'actions/messages'

import { messages } from 'helpers/messagesData'

const initialState = {
  entries: [],
  loading: false,
  init: false,
}

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGES_LOAD:
      if (!state.init) {
        return {
          ...state,
          init: true,
          entries: messages,
        }
      } else {
        return {
          ...state
        }
      }

    case MESSAGE_SEND:
      return update(state, {
        entries: {
          $push: [action.payload.message]
        }
      })

    case MESSAGE_DEL:
      return update(state, {
        entries: {
          $set: state.entries.filter(i => i.id !== action.payload.messageId)
        }
      })

    default:
      return state
  }
}
