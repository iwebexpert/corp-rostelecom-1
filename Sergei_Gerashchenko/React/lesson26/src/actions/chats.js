import {serverUrl} from "../helpers/setting";

export const CHATS_LOAD = 'CHATS_LOAD';
export const CHATS_ADD = 'CHATS_ADD';
export const MESSAGE_SEND = 'MESSAGE_SEND';

export const CHATS_LOAD_REQUEST = 'CHATS_LOAD/CHATS_LOAD_REQUEST';
export const CHATS_LOAD_SUCCESS = 'CHATS_LOAD/CHATS_LOAD_SUCCESS';
export const CHATS_LOAD_FAILURE = 'CHATS_LOAD/CHATS_LOAD_FAILURE';

export const MESSAGES_LOAD_REQUEST = 'CHATS_LOAD/MESSAGES_LOAD_REQUEST';
export const MESSAGES_LOAD_SUCCESS = 'CHATS_LOAD/MESSAGES_LOAD_SUCCESS';
export const MESSAGES_LOAD_FAILURE = 'CHATS_LOAD/MESSAGES_LOAD_FAILURE';

export const MESSAGE_SEND_REQUEST = 'MESSAGE_SEND_REQUEST';
export const MESSAGE_SEND_SUCCESS = 'MESSAGE_SEND_SUCCESS';
export const MESSAGE_SEND_FAILURE = 'MESSAGE_SEND_FAILURE';


import {createAction} from 'redux-api-middleware'

// export const chatsLoadAction = ()=>({
//     type : CHATS_LOAD,
// })


export const chatsLoadAction = () => createAction(
    {
        endpoint : serverUrl+'/chats',
        method: 'GET',
        headers: {'Content-Type':'application/json',"access-control-allow-origin" : "*"},
        types: [CHATS_LOAD_REQUEST,
            CHATS_LOAD_SUCCESS,
            CHATS_LOAD_FAILURE]
    }
);

export const messagesLoadAction = (chatId) => createAction(
    {
        endpoint : serverUrl+'/chats/'+chatId,
        method: 'GET',
        headers: {'Content-Type':'application/json',"access-control-allow-origin" : "*"},
        types: [MESSAGES_LOAD_REQUEST,
            MESSAGES_LOAD_SUCCESS,
            MESSAGES_LOAD_FAILURE]
    }
);





export const  messageSendAction = (message) => {
    console.log('messageSendAction   ' , message);
    return createAction({
    endpoint : serverUrl+'/chats/'+message.chatId,
    method: 'POST',
    headers: {'Content-Type':'application/json',"access-control-allow-origin" : "*"},
    body: JSON.stringify(message),
    types: [MESSAGE_SEND_REQUEST, MESSAGE_SEND_SUCCESS, MESSAGE_SEND_FAILURE]
})};

export const chatsAddAction = (chat) =>({
    type:CHATS_ADD,
    payload:chat,
})

