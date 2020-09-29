import update from 'react-addons-update';

import { CHATS_LOAD, CHATS_MESSAGE_SEND, CHATS_ADD } from '../actions/chats';

import { chats } from '../helpers/chatsData';

const initialState = {
    entries: [],
    loading: false,
};

export const chatsReducer = (state = initialState, action) => {
    // cosole.log(entries.length);
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

            return update(state, {
                entries: {
                    [action.payload.chatId]: {
                        messages: { $push: [{ text: action.payload.text, author: action.payload.author, id: action.payload.id }] },
                    }
                }
            });
        case CHATS_ADD:
            return update(state, {
                entries: {
                    $push: [{ id: state.entries.length, title: action.payload.title, messages: [{ id: 0, author: "Bot", text: `Новый чат ${action.payload.title}` }] }]

                }
            });

        default:
            return state;
    }
}