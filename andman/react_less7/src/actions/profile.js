//export const PROFILE_LOAD = 'PROFILE_LOAD';

export const PROFILE_LOAD_REQUEST = 'PROFILE_LOAD/PROFILE_LOAD_REQUEST';
export const PROFILE_LOAD_SUCCESS = 'PROFILE_LOAD/PROFILE_LOAD_SUCCESS';
export const PROFILE_LOAD_FAILURE = 'PROFILE_LOAD/PROFILE_LOAD_FAILURE';


// export const profileLoadAction = () => ({
//     type: PROFILE_LOAD,
// });

export const profileLoadRequestAction = () => ({
    type: PROFILE_LOAD_REQUEST,
});

export const profileLoadSuccessAction = (data) => ({
    type: PROFILE_LOAD_SUCCESS,
    payload: data,
});

export const profileLoadFailureAction = (error) => ({
    type: PROFILE_LOAD_FAILURE,
    payload: error,
});

export const profileLoadAction = () => {
    return async (dispatch) => {
        try {
            dispatch(profileLoadRequestAction());
            const result = await fetch('/api/profile/0');
            dispatch(profileLoadSuccessAction(await result.json()));
        } catch (error) {
            dispatch(profileLoadFailureAction(error));
        }
    }
};