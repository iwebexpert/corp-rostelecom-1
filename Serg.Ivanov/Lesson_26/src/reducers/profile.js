import update from 'react-addons-update';

import {
    PROFILE_ADD,
    PROFILE_USER_SEND,
    PROFILE_DELETE,
    PROFILE_LOAD_REQUEST,
    PROFILE_LOAD_SUCCESS,
    PROFILE_LOAD_FAILURE,
} from '../actions/profile';

import { profile } from '../helpers/profilesData';

const initialState = {
    entries: [],
    loading: false,
    error: false,
};

export const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        // case PROFILE_LOAD:
        //     return {
        //         ...state,
        //         entries: profile,
        //     }
        case PROFILE_LOAD_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
            }
        case PROFILE_LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                entries: action.payload,
            }
        case PROFILE_LOAD_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            }
        case PROFILE_USER_SEND:


            //     return update(state, {
            //         entries: {
            //             [action.payload.chatId]: {
            //                 messages: {$push: [{text: action.payload.text, author: action.payload.author, id: action.payload.id}]},
            //             }
            //         }
            //     });
            return update(state, {
                entries: {
                    [action.payload.profileId]: {
                        user: { $set: [{ name: action.payload.name, age: action.payload.age, from: action.payload.from, id: action.payload.id }] },
                    }
                }
            });

        case PROFILE_ADD:
            const { login, profileId } = action.payload;
            return update(state, {
                entries: {
                    $merge: {
                        [profileId]: {
                            id: profileId,
                            login,
                            user: [],
                        }
                    }
                },
            });
        case PROFILE_DELETE:
            console.log('delete red profile');
        // return update(state, {
        //     entries: {
        //         $slice: {
        //             [profileId]: {}
        //         }
        //     },
        // });

        default:
            return state;
    }
}