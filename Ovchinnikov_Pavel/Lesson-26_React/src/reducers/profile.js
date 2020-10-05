import update from 'react-addons-update';

import { PROFILE_LOAD, PROFILE_LOAD_REQUEST, PROFILE_LOAD_SUCCESS, PROFILE_LOAD_FAILURE, } from '../actions/profile';

//import { profile } from '../helpers/profileData';


const initialState = {
    entries: {}, // { name: "test" }
    loading: false,
};

export const profileReducer = (state = initialState, action) => {
    console.log("profileReducer", state);
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
                entries: action.payload,//profile,//action.payload,
            }
        case PROFILE_LOAD_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            }

        /*  case PROFILE_LOAD:
              return {
                  ...state,
                  entries: profile,
              }*/
        default:
            return state;
    }
}