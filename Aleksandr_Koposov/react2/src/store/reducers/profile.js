import {
  PROFILE_UPDATE,
  PROFILE_LOAD_REQUEST,
  PROFILE_LOAD_SUCCESS,
  PROFILE_LOAD_FAILURE
} from 'actions/profile'

const initialState = {
  entries: null,
  loading: false,
  error: false,
  init: false,
}

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {

    case PROFILE_LOAD_REQUEST:
      return {...state, loading: true, error: false }

    case PROFILE_LOAD_SUCCESS:
      return { ...state, loading: false, entries: action.payload }

    case PROFILE_LOAD_FAILURE:
      return { ...state, loading: false, error: true }

    case PROFILE_UPDATE:
      return { ...state, entries: action.payload }

    default:
      return state
  }
}
