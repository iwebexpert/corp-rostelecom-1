import {CHANGE_PROFILE, LOAD_PROFILE_REQUEST, LOAD_PROFILE_SUCCESS ,LOAD_PROFILE_FAILURE,  CHANGE_PROFILE_REQUEST, CHANGE_PROFILE_SUCCESS,  CHANGE_PROFILE_FAILURE} from '../actions/profile'
import update from 'immutability-helper'

const initialState = {
    entries: {},
    loading: false,
    error: false
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PROFILE_REQUEST:
        case CHANGE_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
                error: false
            }
        case LOAD_PROFILE_SUCCESS:
        case CHANGE_PROFILE_SUCCESS:
            return {
                ...state,
                entries: action.payload,
                loading: false
            }
        case LOAD_PROFILE_FAILURE:
        case CHANGE_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            }
        case CHANGE_PROFILE:
            return {
                ...state,
                entries: action.payload
            }
        default:
            return state
    }
}
