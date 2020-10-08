import {createAction} from 'redux-actions';

export const profileRequestAction = createAction('[Profile] Request');
export const profileSuccessAction = createAction('[Profile] Success');
export const profileFailureAction = createAction('[Profile] Failure');

export const profileLoadAction = () => {
    return async (dispatch) => {
        try {
            dispatch(profileRequestAction());
            const result = await fetch('/api/profile/0');
            dispatch(profileSuccessAction(await result.json()));
        } catch (error) {
            dispatch(profileFailureAction(error));
        }
    }
};