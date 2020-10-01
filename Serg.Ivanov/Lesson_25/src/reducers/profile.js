//TODO
import update from 'react-addons-update';

import { PROFILE_LOAD } from '../actions/profile';

// import { chats } from '../helpers/chatsData';

const initialState = {
    entries: [],
    loading: false,
};

export const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case PROFILE_LOAD:
            return {
                ...state,
                entries: profile,
            }

        // case CHATS_MESSAGE_SEND:


        //     return update(state, {
        //         entries: {
        //             [action.payload.chatId]: {
        //                 messages: {$push: [{text: action.payload.text, author: action.payload.author, id: action.payload.id}]},
        //             }
        //         }
        //     });

        default:
            return state;
    }
}