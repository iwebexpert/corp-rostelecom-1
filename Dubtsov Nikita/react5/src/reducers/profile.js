import update from "react-addons-update"

import { PROFILE_LOAD } from "../actions/profile"

import { users } from "../helpers/usersData"

const initialState = {
  entries: users,
  loading: false,
}

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_LOAD:
      return {
        ...state,
        entries: users,
      }
    default:
      return state
  }
}
