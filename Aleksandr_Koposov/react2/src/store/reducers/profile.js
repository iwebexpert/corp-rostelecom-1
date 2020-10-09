import { handleActions } from 'redux-actions'
import {
  loadProfileRequest,
  loadProfileSuccess,
  loadProfileFailure
} from 'actions/profile'

const initialState = {
  entries: [],
  loading: false,
  error: false
}

export const profileReducer = handleActions({
  [loadProfileRequest]: (state, action) => {
    return {
      ...state,
      loading: true,
      error: false,
    }
  },

  [loadProfileSuccess]: (state, action) => {
    return {
      ...state,
      loading: false,
      entries: action.payload,
    }
  },

  [loadProfileFailure]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: true,
    }
  },
}, initialState)
