import {combineReducers} from 'redux'
import {chatsReducer} from './chats'
import {profileReducer} from './profile'
import { connectRouter } from 'connected-react-router'

export const rootReducer = history => combineReducers({
    chats: chatsReducer,
    profile: profileReducer,
    router: connectRouter(history)
})