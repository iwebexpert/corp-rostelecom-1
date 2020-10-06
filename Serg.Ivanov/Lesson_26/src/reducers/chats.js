import update from 'react-addons-update';

import {
    CHATS_ADD,
    //CHATS_LOAD, 
    CHATS_MESSAGE_SEND,
    CHATS_FIRE, CHATS_UNFIRE, CHATS_DELETE,

    CHATS_LOAD_REQUEST,
    CHATS_LOAD_SUCCESS,
    CHATS_LOAD_FAILURE,
} from '../actions/chats';

import { chats } from '../helpers/chatsData';

const initialState = {
    entries: [],
    loading: false,
    error: false,
};

export const chatsReducer = (state = initialState, action) => {
    switch (action.type) {
        // case CHATS_LOAD:
        //     return {
        //         ...state,
        //         entries: chats,
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

        case CHATS_MESSAGE_SEND:
            // return {
            //     ...state,
            //     entries: {
            //         ...state.entries,
            //         [action.payload.chatId]: {
            //             ...state.entries[action.payload.chatId],
            //             messages: [
            //                 ...state.entries[action.payload.chatId].messages,
            //                 {text: action.payload.text, author: action.payload.author, id: action.payload.id},
            //             ],
            //         },
            //     }
            // };

            return update(state, {
                entries: {
                    [action.payload.chatId]: {
                        messages: { $push: [{ text: action.payload.text, author: action.payload.author, id: action.payload.id }] },
                    }
                }
            });

        case CHATS_ADD:
            const { title, chatId } = action.payload;
            return update(state, {
                entries: {
                    $merge: {
                        [chatId]: {
                            id: chatId,
                            title,
                            fire: "unfire",
                            messages: [],
                        }
                    }
                },
            });
        case CHATS_DELETE:
            console.log('delete red chats');
        // return update(state, {
        //     entries: {
        //         $slice: {
        //             [chatId]: {}
        //         }
        //     },
        // });

        case CHATS_FIRE:

            return update(state, {
                entries: {
                    $merge: {
                        [action.payload.chatId]: {
                            id: Number(action.payload.chatId), title: action.payload.title, fire: "fire", messages: action.payload.messages
                        }
                    }
                }
            });

        case CHATS_UNFIRE:
            return update(state, {
                entries: {
                    $merge: {
                        [action.payload.chatId]: {
                            id: Number(action.payload.chatId), title: action.payload.title, fire: "unfire", messages: action.payload.messages
                        }
                    }
                }
            });
        default:
            return state;
    }
}