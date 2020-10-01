import update from 'react-addons-update';

import { CHATS_ADD, CHATS_LOAD, CHATS_MESSAGE_SEND } from '../actions/chats';

import { chats } from '../helpers/chatsData';

const initialState = {
    entries: [],
    loading: false,
};

export const chatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHATS_LOAD:
            return {
                ...state,
                entries: chats,
            }

        case CHATS_MESSAGE_SEND:
            return update(state, {
                entries: {
                    [action.payload.chatId]: {
                        messages: { $push: [{ text: action.payload.text, author: action.payload.author, id: action.payload.id, my: action.payload.my }] },
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
                            messages: [],
                            title,
                        }
                    }
                },
            });

        default:
            return state;
    }
}