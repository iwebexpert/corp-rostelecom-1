//export const CHATS_LOAD = 'CHATS_LOAD';
export const CHATS_ADD = 'CHATS_ADD';
export const CHATS_DEL = 'CHATS_DEL';
export const CHATS_BLINK = 'CHATS_BLINK';
export const CHATS_UNBLINK = 'CHATS_UNBLINK';
export const CHATS_MESSAGE_SEND = 'CHATS_MESSAGE_SEND';
export const CHATS_MESSAGE_DEL = 'CHATS_MESSAGE_DEL';

export const CHATS_LOAD_REQUEST = 'CHATS_LOAD/CHATS_LOAD_REQUEST';
export const CHATS_LOAD_SUCCESS = 'CHATS_LOAD/CHATS_LOAD_SUCCESS';
export const CHATS_LOAD_FAILURE = 'CHATS_LOAD/CHATS_LOAD_FAILURE';


/* export const chatsLoadAction = () => ({
    type: CHATS_LOAD,
}); */

export const chatsLoadRequestAction = () => ({
    type: CHATS_LOAD_REQUEST,
});

export const chatsLoadSuccessAction = (data) => ({
    type: CHATS_LOAD_SUCCESS,
    payload: data,
});

export const chatsLoadFailureAction = (error) => ({
    type: CHATS_LOAD_FAILURE,
    payload: error,
});

export const chatsLoadAction = () => {
    return async (dispatch) => {
        try {
            dispatch(chatsLoadRequestAction());
            const result = await fetch('/api/chats?_embed=messages');
            console.log('result ', result.ok);
            if (result.ok) {
                dispatch(chatsLoadSuccessAction(await result.json()));
            } else {
                throw new Error();
            }
        } catch (error) {
            dispatch(chatsLoadFailureAction(error));
        }
    }
};





export const chatsAddAction = (title) => ({
    type: CHATS_ADD,
    payload: { title, },
});

export const chatsDeleteAction = (chatId) => ({
    type: CHATS_DEL,
    payload: { chatId },
});

export const chatsBlinkAction = (chatId) => ({
    type: CHATS_BLINK,
    payload: { chatId },
});
export const chatsUnBlinkAction = () => ({
    type: CHATS_UNBLINK,
});

export const chatsMessageSendAction = (message) => ({
    type: CHATS_MESSAGE_SEND,
    payload: message,
});

export const chatsMessageDeleteAction = (chatId, id) => ({
    type: CHATS_MESSAGE_DEL,
    payload: { chatId, id },
});

