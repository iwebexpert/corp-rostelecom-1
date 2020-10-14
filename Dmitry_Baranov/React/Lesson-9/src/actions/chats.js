export const CHATS_ADD = 'CHATS_ADD';
export const CHATS_MESSAGE_SEND = 'CHATS_MESSAGE_SEND';

export const CHATS_LOAD_REQUEST = 'CHATS_LOAD/CHATS_LOAD_REQUEST';
export const CHATS_LOAD_SUCCESS = 'CHATS_LOAD/CHATS_LOAD_SUCCESS';
export const CHATS_LOAD_FAILURE = 'CHATS_LOAD/CHATS_LOAD_FAILURE';

export const CHATS_FIRE = 'CHATS_FIRE';
export const CHATS_UNFIRE = 'CHATS_UNFIRE';


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
            dispatch(chatsLoadSuccessAction(await result.json()));
        } catch (error) {
            dispatch(chatsLoadFailureAction(error));
        }
    }
};


export const chatsMessageSendAction = (message) => ({
    type: CHATS_MESSAGE_SEND,
    payload: message,
});

export const chatsAddAction = (chatId, title) => ({
    type: CHATS_ADD,
    payload: {chatId, title},
});
export const chatsFireAction = (chatId, title, fire, messages) => ({
    type: CHATS_FIRE,
    payload: {chatId, title, fire, messages},
});

export const chatsUnfireAction = (chatId, title, fire, messages) => ({
    type: CHATS_UNFIRE,
    payload: {chatId, title, fire, messages},
});