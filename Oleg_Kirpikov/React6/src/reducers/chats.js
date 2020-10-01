import update from 'react-addons-update';

import { CHATS_LOAD, CHATS_ADD, CHATS_DEL, CHATS_MESSAGE_DEL, CHATS_MESSAGE_SEND, CHATS_BLINK, CHATS_UNBLINK } from '../actions/chats';

import { chats } from '../helpers/chatsData';

const initialState = {
    entries: [],
    blinkChatId: undefined,
};

export const chatsReducer = (state = initialState, action) => {
    let result = {};
    let idx = -1;
    switch (action.type) {
        case CHATS_LOAD:
            return {
                ...state,
                entries: chats,
            }

        case CHATS_ADD:
            const chatId = Object.keys(state.entries).length;
            return update(state, {
                entries: {
                    $push: [
                        {
                            id: chatId, title: action.payload.title, messages: []
                        }
                    ]
                }
            });

        case CHATS_DEL:
            idx = state.entries.findIndex((item, index) => index == +action.payload.chatId);
            return update(state, {
                entries: { $splice: [[idx, 1]] }
            });


        case CHATS_BLINK:
            result = update(state, {
                blinkChatId: { $set: action.payload.chatId }
            });
            return result;

        case CHATS_UNBLINK:
            result = update(state, {
                blinkChatId: { $set: undefined }
            });
            return result;

        case CHATS_MESSAGE_SEND:
            return update(state, {
                entries: {
                    [action.payload.chatId]: {
                        messages: { $push: [{ text: action.payload.text, author: action.payload.author, id: action.payload.id }] },
                    }
                }
            });


        case CHATS_MESSAGE_DEL:
            idx = state.entries[+action.payload.chatId].messages.findIndex((item, index) => item.id == action.payload.id);

            return update(state, {
                entries: {
                    [action.payload.chatId]: {
                        messages: { $splice: [[idx, 1]] },
                    }
                }
            });


        default:
            return state;
    }
}