import update from 'react-addons-update';

import {
    CHATS_ADD,
    MESSAGE_SEND,

    CHATS_LOAD_REQUEST,
    CHATS_LOAD_SUCCESS,
    CHATS_LOAD_FAILURE,
    MESSAGES_LOAD_REQUEST,
    MESSAGES_LOAD_SUCCESS,
    MESSAGES_LOAD_FAILURE,
    MESSAGE_SEND_REQUEST,
    MESSAGE_SEND_SUCCESS,
    MESSAGE_SEND_FAILURE,
} from '../actions/chats';


const initialState = {
    entries : [],
    loading : false,
    error: false
};

export const chatsReducer = (state = initialState, action) =>{
    switch(action.type){
        // case CHATS_LOAD:
        //     return{...state,
        //     entries: chats,
        //     }
        case CHATS_LOAD_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
            }
        case CHATS_LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                entries: action.payload,
            }
        case CHATS_LOAD_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            }
        case MESSAGES_LOAD_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
            }
        case MESSAGES_LOAD_SUCCESS:
            console.log('MESSAGES_LOAD_SUCCESS', action);
            return update(state, {
                entries: {
                    [action.payload.chatId]: {
                        messages: {$push: action.payload.messages},
                    }
                }
            });

        case MESSAGES_LOAD_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            }

        case MESSAGE_SEND_REQUEST:
            return state;
        case MESSAGE_SEND_FAILURE:
            return state;

        case MESSAGE_SEND_SUCCESS:
            return update(state, {
                entries: {
                    [action.payload.chatId]: {
                        messages: {$push: [{text: action.payload.text, author: action.payload.author, id: action.payload.id}]},
                    }
                }
            });
        default:
            return state;
    }

}