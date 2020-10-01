import update from 'react-addons-update';

import { CHATS_ADD, CHATS_LOAD, CHATS_MESSAGE_SEND, CHATS_FIRE, CHATS_UNFIRE, CHATS_DELETE } from '../actions/chats';

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
            };

        case CHATS_MESSAGE_SEND:

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
        //         $merge: {
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