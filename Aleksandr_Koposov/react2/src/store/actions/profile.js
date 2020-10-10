import { createAction } from 'redux-actions'

export const loadProfileRequest = createAction('PROFILE/LOAD_REQUEST')
export const loadProfileSuccess = createAction('PROFILE/LOAD_SUCCESS')
export const loadProfileFailure = createAction('PROFILE/LOAD_FAILURE')

export const loadProfileAction = () => {
  return async (dispatch) => {
    try {
      dispatch(loadProfileRequest())
      const res = await fetch('/api/profile/1')
      await new Promise(resolve => setTimeout(resolve, 1000)) // Эмуляция загрузки
      dispatch(loadProfileSuccess(await res.json()))
    } catch (error) {
      dispatch(loadProfileFailure(error))
    }
  }
}
export const saveProfileAction = (profile) => {
  return async (dispatch) => {
    try {
      dispatch(loadProfileRequest())
      const res = await fetch('/api/profile/1', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profile)
      })
      dispatch(loadProfileSuccess(await res.json()))
    } catch (error) {
      dispatch(loadProfileFailure(error))
    }
  }
}
