export const CHANGE_PROFILE = 'CHANGE_PROFILE'
// export const CHANGE_PROFILE_REQUEST = 'CHANGE_PROFILE/CHANGE_PROFILE_REQUEST'
// export const CHANGE_PROFILE_SUCCESS = 'CHANGE_PROFILE/CHANGE_PROFILE_SUCCESS'
// export const CHANGE_PROFILE_FAILURE = 'CHANGE_PROFILE/CHANGE_PROFILE_FAILURE'
// export const LOAD_PROFILE_REQUEST = 'LOAD_PROFILE/LOAD_PROFILE_REQUEST'
// export const LOAD_PROFILE_SUCCESS = 'LOAD_PROFILE/LOAD_PROFILE_SUCCESS'
// export const LOAD_PROFILE_FAILURE = 'LOAD_PROFILE/LOAD_PROFILE_FAILURE'

import { createAction } from 'redux-actions'

export const changeProfileRequestAction = createAction('CHANGE_PROFILE/CHANGE_PROFILE_REQUEST')
export const changeProfileSuccessAction = createAction('CHANGE_PROFILE/CHANGE_PROFILE_SUCCESS')
export const changeProfileFailureAction = createAction('CHANGE_PROFILE/CHANGE_PROFILE_FAILURE')

export const loadProfileRequestAction = createAction('LOAD_PROFILE/LOAD_PROFILE_REQUEST')
export const loadProfileSuccessAction = createAction('LOAD_PROFILE/LOAD_PROFILE_SUCCESS')
export const loadProfileFailureAction = createAction('LOAD_PROFILE/LOAD_PROFILE_FAILURE')


// export const changeProfileAction = (profile) => ({
//     type: CHANGE_PROFILE,
//     payload: profile
// })

// export const loadProfileRequestAction = () => ({
//     type: LOAD_PROFILE_REQUEST
// })
//
// export const loadProfileSuccessAction = (data) => ({
//     type: LOAD_PROFILE_SUCCESS,
//     payload: data
// })

// export const loadProfileFailureAction = (error) => ({
//     type: LOAD_PROFILE_FAILURE,
//     payload: error
// })
//
// export const changeProfileRequestAction = (profile) => ({
//     type: CHANGE_PROFILE_REQUEST,
//     payload: profile
// })
//
// export const changeProfileSuccessAction = (profile) => ({
//     type: CHANGE_PROFILE_SUCCESS,
//     payload: profile
//
// })

// export const changeProfileFailureAction = (error) => ({
//     type: CHANGE_PROFILE_FAILURE,
//     payload: error
// })

export const loadProfileAction = () => {
    return async dispatch => {
        try {
            dispatch(loadProfileRequestAction())
            const loadProfile = await fetch('/api/profile',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if (loadProfile.ok) {
                dispatch(loadProfileSuccessAction(await loadProfile.json()))
            } else {
                throw new Error(loadProfile.status)
            }
        }
        catch(error) {
            dispatch(loadProfileFailureAction(error))
        }

    }
}

export const changeProfileAction = (profile) => {
    return async dispatch => {
        try {
            dispatch(changeProfileRequestAction())
            const changeProfile = await fetch('/api/profile',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(profile)
            })
            if (changeProfile.ok) {
                dispatch(changeProfileSuccessAction(await changeProfile.json()))
            } else {
                throw new Error(changeProfile.status)
            }
        }
        catch(error) {
            dispatch(changeProfileFailureAction(error))
        }

    }
}
