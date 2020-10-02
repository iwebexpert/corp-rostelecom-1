import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import { chatsReducer } from 'reducers/chats'
import { messagesReducer } from 'reducers/messages'
import { profileReducer } from 'reducers/profile'

export const rootReducer = history => combineReducers({
  router: connectRouter(history),
  chats: chatsReducer,
  messages: messagesReducer,
  profile: profileReducer,
})
