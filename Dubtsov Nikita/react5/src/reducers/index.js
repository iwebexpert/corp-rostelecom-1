import { combineReducers } from "redux"

import { chatsReducer } from "./chats"
import { profileReducer } from "./profile"

export const rootReducer = combineReducers({
  chats: chatsReducer,
  users: profileReducer,
})
