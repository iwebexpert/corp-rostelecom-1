import { createAction } from 'redux-api-middleware'

export const PROFILE_UPDATE = 'PROFILE_UPDATE'

export const PROFILE_LOAD_REQUEST = 'PROFILE_LOAD/PROFILE_LOAD_REQUEST'
export const PROFILE_LOAD_SUCCESS = 'PROFILE_LOAD/PROFILE_LOAD_SUCCESS'
export const PROFILE_LOAD_FAILURE = 'PROFILE_LOAD/PROFILE_LOAD_FAILURE'

export const profileLoadAction = () =>
  createAction({
    endpoint: "/api/profile/1",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    types: [PROFILE_LOAD_REQUEST, PROFILE_LOAD_SUCCESS, PROFILE_LOAD_FAILURE],
  })

export const profileUpdateAction = (payload) => ({
  type: PROFILE_UPDATE,
  payload
})
