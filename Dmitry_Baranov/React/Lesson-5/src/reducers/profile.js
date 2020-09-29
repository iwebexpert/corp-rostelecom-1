import {PROFILE_LOAD} from '../actions/profile';
import {profile} from "../helpers/profilesData";


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