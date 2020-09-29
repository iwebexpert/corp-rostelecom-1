import { combineReducers } from 'redux'

import { chatsReducer } from 'reducers/chats'
import { messagesReducer } from 'reducers/messages'
import { profileReducer } from 'reducers/profile'

export const rootReducer = combineReducers({
  chats: chatsReducer,
  messages: messagesReducer,
  profile: profileReducer,
})
