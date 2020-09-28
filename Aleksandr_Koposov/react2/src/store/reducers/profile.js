import update from 'react-addons-update'

import { PROFILE_LOAD, PROFILE_UPDATE } from 'actions/profile'

import { profile } from 'helpers/profileData'

const initialState = {
  entries: null,
  loading: false,
  init: false,
}

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_LOAD:
      if (!state.init) {
        return {
          ...state,
          init: true,
          entries: profile,
        }
      } else {
        return {
          ...state
        }
      }

    case PROFILE_UPDATE:
      return {
        ...state,
        entries: action.payload
      }

    default:
      return state
  }
}
