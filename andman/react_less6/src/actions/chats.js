export const CHATS_LOAD = 'CHATS_LOAD';
export const CHATS_MESSAGE_SEND = 'CHATS_MESSAGE_SEND';
export const CHATS_MESSAGE_DELETE = 'CHATS_MESSAGE_DELETE';
export const CHATS_ADD = 'CHATS_ADD';
export const CHAT_FIRE = 'CHAT_FIRE';
export const CHAT_UNFIRE = 'CHAT_UNFIRE';
export const CHAT_DELETE = 'CHAT_DELETE';


export const chatsLoadAction = () => ({
    type: CHATS_LOAD,
});

export const chatsMessageSendAction = (message) => ({
    type: CHATS_MESSAGE_SEND,
    payload: message,
});

export const chatsAddAction = (chat) => ({
    type: CHATS_ADD,
    payload: chat,
});

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

export const chatsMessageDeleteAction = (message) => ({
    type: CHATS_MESSAGE_DELETE,
    payload: message,
});

