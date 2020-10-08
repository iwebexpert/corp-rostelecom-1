import { handleActions } from 'redux-actions';
import update from 'react-addons-update';
import {
    chatsLoadRequestAction,
    chatsLoadSuccessAction,
    chatsLoadFailureAction,
    chatsAddAction,
    chatsDeleteAction,
    chatsUnBlinkAction,
    chatsBlinkAction,
    chatsMessageSendAction,
    chatsMessageDeleteAction
} from '../actions/chats';


const initialState = {
    entries: [],
    blinkChatId: undefined,
    loading: true,
    error: false,
};

export const chatsReducer = handleActions({
    [chatsLoadRequestAction]: (state, action) => {
        return {
            ...state,
            loading: true,
            error: false,
        }
    },
    [chatsLoadSuccessAction]: (state, action) => {
        return {
            ...state,
            loading: false,
            entries: action.payload,
        }
    },
    [chatsLoadFailureAction]: (state, action) => {
        return {
            ...state,
            loading: false,
            error: true,
        }
    },
    [chatsAddAction]: (state, action) => {
        const chatId = Math.max.apply(Math, Object.keys(state.entries)) + 1;
        console.log('add', action);
        return update(state, {
            entries: {
                $push: [
                    {
                        id: chatId, title: action.payload, messages: []
                    }
                ]
            }
        })
    },
    [chatsDeleteAction]: (state, action) => {
        const idx = state.entries.findIndex((item, index) => index == +action.payload.chatId);
        return update(state, {
            entries: { $splice: [[idx, 1]] }
        })
    },

    [chatsBlinkAction]: (state, action) => {
        const result = update(state, {
            blinkChatId: { $set: action.payload.chatId }
        });
        return result
    },
    [chatsUnBlinkAction]: (state, action) => {
        const result = update(state, {
            blinkChatId: { $set: undefined }
        });
        return result;
    },
    [chatsMessageSendAction]: (state, action) => {
        return update(state, {
            entries: {
                [action.payload.chatId]: {
                    messages: { $push: [{ text: action.payload.text, author: action.payload.author, id: action.payload.id }] },
                }
            }
        })
    },

    [chatsMessageDeleteAction]: (state, action) => {
        const idx = state.entries[+action.payload.chatId].messages.findIndex((item, index) => item.id == action.payload.id);
        return update(state, {
            entries: {
                [action.payload.chatId]: {
                    messages: { $splice: [[idx, 1]] },
                }
            }
        })
    },
}, initialState);
