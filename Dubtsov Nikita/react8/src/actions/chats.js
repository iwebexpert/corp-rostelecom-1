import { createAction } from "redux-api-middleware"

export const CHATS_LOAD = "CHATS_LOAD"
export const CHATS_ADD = "CHATS_ADD"
export const CHATS_MESSAGE_SEND = "CHATS_MESSAGE_SEND"

export const CHATS_FIRE = "CHATS_FIRE"
export const CHATS_UNFIRE = "CHATS_UNFIRE"

export const CHATS_LOAD_REQUEST = "CHATS_LOAD/CHATS_LOAD_REQUEST"
export const CHATS_LOAD_SUCCESS = "CHATS_LOAD/CHATS_LOAD_SUCCESS"
export const CHATS_LOAD_FAILURE = "CHATS_LOAD/CHATS_LOAD_FAILURE"

// export const chatsLoadAction = () => ({
//   type: CHATS_LOAD,
// })

export const chatsLoadAction = () =>
  createAction({
    endpoint: "/api/chats?_embed=messages",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    types: [CHATS_LOAD_REQUEST, CHATS_LOAD_SUCCESS, CHATS_LOAD_FAILURE],
  })

export const chatsMessageSendAction = (message) => ({
  type: CHATS_MESSAGE_SEND,
  payload: message,
})

export const chatsAddAction = (chatId, title) => ({
  type: CHATS_ADD,
  payload: { chatId, title },
})

export const chatsFireAction = (chatId, chatFire) => ({
  type: CHATS_FIRE,
  payload: { chatId, chatFire },
})

export const chatsUnfireAction = (chatId, chatFire) => ({
  type: CHATS_UNFIRE,
  payload: { chatId, chatFire },
})
