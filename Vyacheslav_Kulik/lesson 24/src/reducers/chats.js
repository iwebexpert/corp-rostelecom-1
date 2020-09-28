import {ADD_CHATS, ADD_MESSAGES_CHATS, ADD_NEW_CHAT} from '../actions/chats'
import {chats} from '../helpers/chats'
import update from 'immutability-helper'
import moment from 'moment'

const initialState = {
    entries: [],
    loading: false
}

export const chatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CHATS:
            return {
                ...state,
                entries: chats
            }
        case ADD_MESSAGES_CHATS:
            return {
                ...state,
                entries: action.payload
            }
        case ADD_NEW_CHAT:
            return update(state, {
                entries: {
                    $push: [{
                        id: state.entries.length + '',
                        title: action.payload,
                        srcAvatar: 'src/img/bot.svg',
                        messages: [{
                            id: '0',
                            author: 'Bot',
                            time: moment(),
                            text: 'Привет, это новый чат!'
                        }]
                    }]
                }
            })
        default:
            return state
    }

}


