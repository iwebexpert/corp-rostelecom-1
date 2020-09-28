import {combineReducers} from 'redux'
import {chatsReducer} from './chats'

export const rootReducer = combineReducers({
    chats: chatsReducer
})