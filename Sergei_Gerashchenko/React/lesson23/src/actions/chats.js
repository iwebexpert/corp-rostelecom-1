export const CHATS_LOAD = 'CHATS_LOAD';
export const MESSAGE_SEND = 'MESSAGE_SEND';

export const chatsLoadAction = ()=>({
    type : CHATS_LOAD,
})
export const  messageSendAction = (message) =>({
    type : MESSAGE_SEND,
    payload: message,
});

