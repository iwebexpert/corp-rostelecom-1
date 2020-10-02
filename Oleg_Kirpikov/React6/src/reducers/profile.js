import update from 'react-addons-update';
import { PROFILE_LOAD } from '../actions/profile';
import { profile } from '../helpers/profileData';

const initialState = {
    profile: {},
    loading: false,
};

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_LOAD:
            return update(state, {
                profile: { $set: profile },
            })

        default:
            return state;
    }
}