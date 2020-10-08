import { createAction } from 'redux-actions';

export const chatsLoadRequestAction = createAction('[Chats] Request');
export const chatsLoadSuccessAction = createAction('[Chats] Success');
export const chatsLoadFailureAction = createAction('[Chats] Failure');
export const chatsAddAction = createAction('[Chats] Add');
export const chatsDeleteAction = createAction('[Chats] Delete');
export const chatsUnBlinkAction = createAction('[Chats] UnBlink');
export const chatsBlinkAction = createAction('[Chats] Blink');
export const chatsMessageSendAction = createAction('[Chats] MessageSend');
export const chatsMessageDeleteAction = createAction('[Chats] MessageDelete');

export const chatsLoadAction = () => {
    return async (dispatch) => {
        try {
            dispatch(chatsLoadRequestAction());
            const result = await fetch('/api/chats?_embed=messages');
            dispatch(chatsLoadSuccessAction(await result.json()));
        } catch (error) {
            dispatch(chatsLoadFailureAction(error));
        }
    }
};
