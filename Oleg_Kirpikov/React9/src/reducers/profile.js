import { handleActions } from 'redux-actions';
import {
    profileRequestAction,
    profileSuccessAction,
    profileFailureAction
} from '../actions/profile';

const initialState = {
    entries: [],
    loading: true,
    error: false,
};

export const profileReducer = handleActions({
    [profileRequestAction]: (state, action) => {
        return {
            ...state,
            loading: true,
            error: false,
        }
    },

    [profileSuccessAction]: (state, action) => {
        return {
            ...state,
            loading: false,
            profile: action.payload[0],
        }
    },

    [profileFailureAction]: (state, action) => {
        return {
            ...state,
            loading: false,
            error: true,
        };
    },
}, initialState);

