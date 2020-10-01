import update from 'react-addons-update';

import { PROFILE_LOAD } from '../actions/profile';

import { profile } from '../helpers/profileData';


const initialState = {
    entries: {}, // { name: "test" }
    loading: false,
};

export const profileReducer = (state = initialState, action) => {
    console.log("profileReducer", state);
    switch (action.type) {
        case PROFILE_LOAD:
            return {
                ...state,
                entries: profile,
            }
        default:
            return state;
    }
}