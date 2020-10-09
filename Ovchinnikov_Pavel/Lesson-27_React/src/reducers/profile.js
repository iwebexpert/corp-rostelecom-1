import { profileRequestAction, profileSuccessAction, profileFailureAction } from '../actions/profile';
import { handleActions } from 'redux-actions';

const initialState = {
    entries: {}, // { name: "test" }
    loading: false,
    error: false,
};

export const profileReducer = handleActions({
    [profileRequestAction]: (state, action) => {
        return {
            ...state,
            loading: true,
            error: false,
        };
    },

    [profileSuccessAction]: (state, action) => {
        return {
            ...state,
            loading: false,
            entries: action.payload,//profile,//action.payload,
        };
    },

    [profileFailureAction]: (state, action) => {
        return {
            ...state,
            loading: false,
            error: true,
        };
    },
}, initialState);
