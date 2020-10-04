import {LOAD_CHATS, ADD_MESSAGES_CHATS,  DELETE_MESSAGES_CHATS, ADD_NEW_CHAT, FIRED_CHAT, UNFIRED_CHAT, LOAD_CHATS_REQUEST, LOAD_CHATS_SUCCESS, LOAD_CHATS_FAILURE} from '../actions/chats'
import {ADD_MESSAGES_CHATS_REQUEST, ADD_MESSAGES_CHATS_SUCCESS, ADD_MESSAGES_CHATS_FAILURE} from '../actions/chats'
import {DELETE_MESSAGES_CHATS_REQUEST, DELETE_MESSAGES_CHATS_SUCCESS, DELETE_MESSAGES_CHATS_FAILURE} from '../actions/chats'
import {ADD_NEW_CHAT_REQUEST, ADD_NEW_CHAT_SUCCESS, ADD_NEW_CHAT_FAILURE} from '../actions/chats'
// import {chats} from '../helpers/chats'
import update from 'immutability-helper'
import moment from 'moment'


const initialState = {
    entries: [],
    loading: false,
    loadingMessage: {
        flag: false,
        messageID: ''},
    error: false,
    errorMessage: false

}

export const chatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGES_CHATS_REQUEST:
            const {chatId, ...message} = action.payload
            return update(state, {
                loadingMessage: {
                    flag: {$set: true},
                    messageID: {$set: message.id}
                },
                entries: {
                    [chatId]: {
                        messages: {
                            $push: [message]
                        }
                    }
                }
            })
        case DELETE_MESSAGES_CHATS_REQUEST:
            return {
                ...state,
                loadingMessage: {
                    flag: true,
                    messageID: action.payload
                },
                errorMessage: false
            }
        case ADD_MESSAGES_CHATS_SUCCESS:
            return update(state, {
                loadingMessage: {
                    flag: {$set: false},
                    messageID: {$set: ''}
                }
            })
        case ADD_MESSAGES_CHATS_FAILURE:
        case DELETE_MESSAGES_CHATS_FAILURE:
            return {
                ...state,
                loadingMessage: {
                    flag: false,
                    messageID: ''
                },
                errorMessage: true
            }
        case LOAD_CHATS:
            return {
                ...state,
                entries: chats
            }
        case LOAD_CHATS_REQUEST:
        case ADD_NEW_CHAT_REQUEST:
            return {
                ...state,
                loading: true,
                error: false
            }
        case LOAD_CHATS_SUCCESS:
            return {
                ...state,
                entries: action.payload,
                loading: false
            }
        case LOAD_CHATS_FAILURE:
        case ADD_NEW_CHAT_FAILURE:
            return {
                ...state,
                loading: false,
                error: true

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
        case DELETE_MESSAGES_CHATS:
        case DELETE_MESSAGES_CHATS_SUCCESS:
            return update(state, {
                loadingMessage: {
                    flag: {$set: false},
                    messageID: {$set: ''}
                },
                entries: {
                    [action.payload.chatId]: {
                        messages: {
                            $splice: [[action.payload.messageId, 1]]
                        }
                    }
                }
            })
        case ADD_NEW_CHAT_SUCCESS:
            console.log(action.payload)
            return update(state, {
                loading: {$set: false},
                entries: {
                    $push: [{
                        ...action.payload,
                        messages: []
                    }]
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


