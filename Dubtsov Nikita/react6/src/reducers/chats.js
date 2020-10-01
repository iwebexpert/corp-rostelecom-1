import update from "react-addons-update"

import {
  CHATS_LOAD,
  CHATS_ADD,
  CHATS_FIRE,
  CHATS_UNFIRE,
  CHATS_MESSAGE_SEND,
} from "../actions/chats"

import { chats } from "../helpers/chatsData"

const initialState = {
  entries: [],
  loading: false,
}

export const chatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHATS_LOAD:
      console.log(chats)
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

    case CHATS_ADD:
      const { title, chatId } = action.payload
      return update(state, {
        entries: {
          $merge: {
            [chatId]: {
              id: chatId,
              messages: [],
              title,
            },
          },
        },
      })
    case CHATS_FIRE:
      return update(state, {
        entries: {
          [action.payload.chatId]: {
            $merge: {
              fire: !action.payload.chatFire,
            },
          },
        },
      })

    case CHATS_UNFIRE:
      return update(state, {
        entries: {
          [action.payload.chatId]: {
            $merge: {
              fire: !action.payload.chatFire,
            },
          },
        },
      })

    default:
      return state
  }
}
