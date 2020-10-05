import {
    PROFILE_LOAD_REQUEST,
    PROFILE_LOAD_SUCCESS,
    PROFILE_LOAD_FAILURE,
} from '../actions/profile';


const initialState = {
    profile: {},
    loading: false,
    error: false,
};

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {

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
                profile: action.payload[0],
            }
        case PROFILE_LOAD_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            }

        default:
            return state;
    }
}