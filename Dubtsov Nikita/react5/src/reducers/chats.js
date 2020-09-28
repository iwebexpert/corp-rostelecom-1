import update from "react-addons-update"

import { CHATS_LOAD, CHATS_MESSAGE_SEND } from "../actions/chats"

import { chats } from "../helpers/chatsData"

const initialState = {
  entries: [],
  loading: false,
}

export const chatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHATS_LOAD:
      return {
        ...state,
        entries: chats,
      }

    case CHATS_MESSAGE_SEND:
      return update(state, {
        entries: {
          [action.payload.chatId]: {
            messages: {
              $push: [
                {
                  text: action.payload.text,
                  author: action.payload.author,
                  id: action.payload.id,
                },
              ],
            },
          },
        },
      })

    default:
      return state
  }
}
