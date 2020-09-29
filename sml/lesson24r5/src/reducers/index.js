// для комбинирования всех редьюсов
import { combineReducers } from 'redux';

import { chatsReducer } from './chats';
import { profileReducer } from './profile';

export const rootReducer = combineReducers({
    chats: chatsReducer,
    profile: profileReducer, //TODO
});