import {CHANGE_PROFILE} from 'actions/profile'
import update from 'immutability-helper'

const initialState = {
    entries: {
        author: 'Гость',
        age: ''
    }
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_PROFILE:
            return {
                ...state,
                entries: action.payload
            }
        default:
            return state
    }
}
