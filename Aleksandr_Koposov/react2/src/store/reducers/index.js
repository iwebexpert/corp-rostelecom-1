import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import { chatsReducer } from 'reducers/chats'
import { profileReducer } from 'reducers/profile'

export const rootReducer = history => combineReducers({
  router: connectRouter(history),
  chats: chatsReducer,
  profile: profileReducer,
})
