import { handleActions } from 'redux-actions';
import {
    //PROFILE_LOAD,
    // PROFILE_LOAD_REQUEST,
    // PROFILE_LOAD_SUCCESS,
    // PROFILE_LOAD_FAILURE,
    profileRequestAction,
    profileSuccessAction,
    profileFailureAction
} from '../actions/profile';

//import { profile } from '../helpers/profileData';

const initialState = {
    entries: {},
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
            error: false,
            entries: action.payload,
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


// export const profileReducer = (state = initialState, action) => {
//     switch (action.type) {
//         // case PROFILE_LOAD:
//         //     return {
//         //         ...state,
//         //         entries: profile,
//         //     }        
//         case PROFILE_LOAD_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//                 error: false,
//             }
//         case PROFILE_LOAD_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 entries: action.payload,
//             }
//         case PROFILE_LOAD_FAILURE:
//             return {
//                 ...state,
//                 loading: false,
//                 error: true,
//             }
//         default:
//             return state;
//     }
// }