import {LOAD_CHATS, ADD_MESSAGES_CHATS, ADD_NEW_CHAT, FIRED_CHAT, UNFIRED_CHAT} from '../actions/chats'
import {chats} from '../helpers/chats'
import update from 'immutability-helper'
import moment from 'moment'

const initialState = {
    entries: chats,
    loading: false
}

export const chatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_CHATS:
            return {
                ...state,
                entries: chats
            }
        case ADD_MESSAGES_CHATS:
            return update(state, {
                entries: {
                    [action.payload.chatId]: {
                        messages: {
                            $push: [action.payload.message]
                        }
                    }
                }
            })
        case ADD_NEW_CHAT:
            return update(state, {
                entries: {
                    $push: [{
                        id: state.entries.length + '',
                        title: action.payload,
                        srcAvatar: 'src/img/bot.svg',
                        fired: false,
                        messages: [{
                            id: '0',
                            author: 'Bot',
                            time: moment(),
                            text: 'Привет, это новый чат!'
                        }]
                    }]
                }
            })
        case FIRED_CHAT:
            return update(state, {
                entries: {
                    [action.payload]: {
                        fired: {$set: true}
                    }
                }
            })
        case UNFIRED_CHAT:
            return update(state, {
                entries: {
                    [action.payload]: {
                        fired: {$set: false}
                    }
                }
            })
        default:
            return state
    }

}


