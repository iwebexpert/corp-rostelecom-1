import update from 'react-addons-update';

import { CHATS_LOAD, CHATS_MESSAGE_SEND, CHATS_MESSAGE_DELETE, CHATS_ADD, CHAT_FIRE, CHAT_UNFIRE, CHAT_DELETE } from '../actions/chats';

import { nanoid } from 'nanoid';
import { chats } from '../helpers/chatsData';

const initialState = {
    entries: [],
    loading: false,
};

export const chatsReducer = (state = initialState, action) => {
    // cosole.log(entries.length);
    let chatIndex = null;
    switch (action.type) {
        case CHATS_LOAD:
            if (state.entries.length === 0) {
                return {
                    ...state,
                    entries: chats,
                }
            }
            else return state;

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
            chatIndex = state.entries.findIndex((e, index, array) => (e.id === action.payload.chatIdUniq));

            return update(state, {
                entries: {
                    [chatIndex]: {
                        messages: { $push: [{ text: action.payload.text, author: action.payload.author, id: action.payload.id }] },
                    }
                }
            });
        case CHATS_ADD:
            return update(state, {
                entries: {
                    $push: [{ id: nanoid(), title: action.payload.title, messages: [{ id: nanoid(), author: "Bot", text: `Новый чат ${action.payload.title}` }] }]

                }
            });
        case CHAT_FIRE:
            chatIndex = state.entries.findIndex((e, index, array) => (e.id === action.payload));
            return update(state, {
                entries: {
                    [chatIndex]: {
                        fire: { $set: true },
                    }
                }
            });
        case CHAT_UNFIRE:
            chatIndex = state.entries.findIndex((e, index, array) => (e.id === action.payload));
            return update(state, {
                entries: {
                    [chatIndex]: {
                        fire: { $set: false },
                    }
                }
            });
        case CHAT_DELETE:
            // return {
            //     ...state,
            //     entries: [...state.entries.slice(0, action.payload), ...state.entries.slice(action.payload + 1)]
            // };            
            chatIndex = state.entries.findIndex((e, index, array) => (e.id === action.payload));
            return update(state, {
                entries: { $splice: [[chatIndex, 1]] },
            });


        case CHATS_MESSAGE_DELETE:
            chatIndex = state.entries.findIndex((e, index, array) => (e.id === action.payload.chatIdUniq));
            const indexMsg = state.entries[chatIndex].messages.findIndex((e, index, array) => (e.id === action.payload.msgId));
            return update(state, {
                entries: {
                    [chatIndex]: {
                        messages: { $splice: [[indexMsg, 1]] },
                    }
                }
            });

        // return {
        //     ...state,
        //     entries: [
        //         ...state.entries,
        //         [action.payload.chatId]: {
        //             ...state.entries[action.payload.chatId],
        //             messages: [
        //                 ...state.entries[action.payload.chatId].messages.slice(0, index), ...state.entries[action.payload.chatId].messages.slice(index + 1)
        //             ],
        //         },
        //     ]
        // };


        default:
            return state;
    }
}