export const CHATS_LOAD = 'CHATS_LOAD';
export const CHATS_ADD = 'CHATS_ADD';
export const CHATS_MESSAGE_SEND = 'CHATS_MESSAGE_SEND';

export const chatsLoadAction = () => ({
    type: CHATS_LOAD,
});

export const chatsAddAction = (title) => ({
    type: CHATS_ADD,
    payload: { title, },
});


export const chatsMessageSendAction = (message) => ({
    type: CHATS_MESSAGE_SEND,
    payload: message,
});