import { createAction } from 'redux-api-middleware';
//export const CHATS_LOAD = 'CHATS_LOAD';
//export const CHATS_MESSAGE_SEND = 'CHATS_MESSAGE_SEND';
//export const CHATS_MESSAGE_DELETE = 'CHATS_MESSAGE_DELETE';
//export const CHATS_ADD = 'CHATS_ADD';
export const CHAT_FIRE = 'CHAT_FIRE';
export const CHAT_UNFIRE = 'CHAT_UNFIRE';
export const CHAT_DELETE = 'CHAT_DELETE';

export const CHATS_LOAD_REQUEST = 'CHATS_LOAD/CHATS_LOAD_REQUEST';
export const CHATS_LOAD_SUCCESS = 'CHATS_LOAD/CHATS_LOAD_SUCCESS';
export const CHATS_LOAD_FAILURE = 'CHATS_LOAD/CHATS_LOAD_FAILURE';

export const CHATS_ADD_REQUEST = 'CHATS_ADD/CHATS_ADD_REQUEST';
export const CHATS_ADD_SUCCESS = 'CHATS_ADD/CHATS_ADD_SUCCESS';
export const CHATS_ADD_FAILURE = 'CHATS_ADD/CHATS_ADD_FAILURE';


export const CHATS_MSG_ADD_REQUEST = 'CHATS_MSG_ADD/CHATS_MSG_ADD_REQUEST';
export const CHATS_MSG_ADD_SUCCESS = 'CHATS_MSG_ADD/CHATS_MSG_ADD_SUCCESS';
export const CHATS_MSG_ADD_FAILURE = 'CHATS_MSG_ADD/CHATS_MSG_ADD_FAILURE';

export const CHATS_MSG_DEL_REQUEST = 'CHATS_MSG_DEL/CHATS_MSG_DEL_REQUEST';
export const CHATS_MSG_DEL_SUCCESS = 'CHATS_MSG_DEL/CHATS_MSG_DEL_SUCCESS';
export const CHATS_MSG_DEL_FAILURE = 'CHATS_MSG_DEL/CHATS_MSG_DEL_FAILURE';

// export const chatsLoadAction = () => ({
//     type: CHATS_LOAD,
// });

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



// export const chatsMessageSendAction = (message) => ({
//     type: CHATS_MESSAGE_SEND,
//     payload: message,
// });

// export const chatsAddAction = (chat) => ({
//     type: CHATS_ADD,
//     payload: chat,
// });

export const chatFireAction = (chatId) => ({
    type: CHAT_FIRE,
    payload: chatId,
});

export const chatUnfireAction = (chatId) => ({
    type: CHAT_UNFIRE,
    payload: chatId,
});

export const chatDeleteAction = (chatId) => ({
    type: CHAT_DELETE,
    payload: chatId,
});

// export const chatsMessageDeleteAction = (message) => ({
//     type: CHATS_MESSAGE_DELETE,
//     payload: message,
// });



export const chatsAddRequestAction = (chat) => ({
    type: CHATS_ADD_REQUEST,
});

export const chatsAddSuccessAction = (chat) => ({
    type: CHATS_ADD_SUCCESS,
    payload: chat,
});

export const chatsAddFailureAction = (error) => ({
    type: CHATS_ADD_FAILURE,
    payload: error,
});

export const chatsAddAction = (chat) => {
    return async (dispatch) => {
        try {
            dispatch(chatsAddRequestAction(chat));
            const result = await fetch('/api/chats',
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify(chat)
                });
            dispatch(chatsAddSuccessAction(await result.json()));
        } catch (error) {
            dispatch(chatsAddFailureAction(error));
        }
    }
};



export const chatsMsgAddRequestAction = (message) => ({
    type: CHATS_MSG_ADD_REQUEST,
});

export const chatsMsgAddSuccessAction = (message) => ({
    type: CHATS_MSG_ADD_SUCCESS,
    payload: message,
});

export const chatsMsgAddFailureAction = (error) => ({
    type: CHATS_MSG_ADD_FAILURE,
    payload: error,
});


export const chatsMessageSendAction = (message) => {
    return async (dispatch) => {
        try {
            dispatch(chatsMsgAddRequestAction(message));
            const result = await fetch('/api/messages',
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify(message)
                });
            dispatch(chatsMsgAddSuccessAction(await result.json()));
        } catch (error) {
            dispatch(chatsMsgAddFailureAction(error));
        }
    }
};

//Удаление сообщений

export const chatsMsgDelRequestAction = (message) => ({
    type: CHATS_MSG_DEL_REQUEST,
});

export const chatsMsgDelSuccessAction = (message) => ({
    type: CHATS_MSG_DEL_SUCCESS,
    payload: message,
});

export const chatsMsgDelFailureAction = (error) => ({
    type: CHATS_MSG_DEL_FAILURE,
    payload: error,
});


export const chatsMessageDeleteAction = (message) => {
    const returnMsg = () => { return message };
    return async (dispatch) => {
        try {
            dispatch(chatsMsgDelRequestAction(message));
            const result = await fetch(`/api/messages/${message.id}`,
                {
                    method: "DELETE"
                });
            dispatch(chatsMsgDelSuccessAction(await returnMsg()));
        } catch (error) {
            dispatch(chatsMsgDelFailureAction(error));
        }
    }
};