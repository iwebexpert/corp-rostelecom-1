export const PROFILE_LOAD = 'PROFILE_LOAD'
export const PROFILE_UPDATE = 'PROFILE_UPDATE'

export const profileLoadAction = () => ({
  type: PROFILE_LOAD
})

export const profileUpdateAction = (payload) => ({
  type: PROFILE_UPDATE,
  payload
})
