
export const PROFILE_ADD = 'PROFILE_ADD';
export const PROFILE_USER_SEND = 'PROFILE_USER_SEND';
export const PROFILE_DELETE = 'PROFILE_DELETE';
export const PROFILE_LOAD_REQUEST = 'PROFILE_LOAD/PROFILE_LOAD_REQUEST';
export const PROFILE_LOAD_SUCCESS = 'PROFILE_LOAD/PROFILE_LOAD_SUCCESS';
export const PROFILE_LOAD_FAILURE = 'PROFILE_LOAD/PROFILE_LOAD_FAILURE';

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
            const result = await fetch('/api/profile?_embed=user');
            dispatch(profileLoadSuccessAction(await result.json()));
        } catch (error) {
            dispatch(profileLoadFailureAction(error));
        }
    }
};
export const profileAddAction = (profileId, login) => ({
    type: PROFILE_ADD,
    payload: { profileId, login },
});
export const profileDeleteAction = (profileId) => ({
    type: PROFILE_DELETE,
    payload: profileId,
});
export const profileUserSendAction = (user) => ({
    type: PROFILE_USER_SEND,
    payload: user,
});