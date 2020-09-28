import update from 'react-addons-update';

import { PROFILE_LOAD } from '../actions/profile';



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



        default:
            return state;
    }
} 