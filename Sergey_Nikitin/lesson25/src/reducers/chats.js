import update from 'react-addons-update';

import { CHATS_LOAD, CHATS_MESSAGE_SEND, CHATS_ADD, CHATS_FIRE, CHATS_UNFIRE } from '../actions/chats';

import { chats } from '../helpers/chatsData';

const initialState = {
    entries: [],
    loading: false,
};
function switchFire(state, key) {
    let res = state.entries.slice();
    res[key].fire = !res[key].fire;
    return res;
}


export const chatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHATS_LOAD:
            return {
                ...state,
                entries: chats,
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
            console.log(action);
            return {
                ...state,
                entries: state.entries.concat(action.payload),
            }

        case CHATS_FIRE:
            console.log(action);
            return {
                ...state,
                entries: switchFire(state, action.payload),
            }
        case CHATS_UNFIRE:
            console.log(action);
            return {
                ...state,
                entries: switchFire(state, action.payload),
            }
        /* return update(state, {
             entries: {
                 $push: [JSON.stringify(action.payload.chat)]
             }
         });*/

        default:
            return state;
    }
}