export const CHATS_LOAD = 'CHATS_LOAD';
export const CHATS_ADD = 'CHATS_ADD';
export const CHATS_DEL = 'CHATS_DEL';
export const CHATS_BLINK = 'CHATS_BLINK';
export const CHATS_UNBLINK = 'CHATS_UNBLINK';
export const CHATS_MESSAGE_SEND = 'CHATS_MESSAGE_SEND';
export const CHATS_MESSAGE_DEL = 'CHATS_MESSAGE_DEL';

export const chatsLoadAction = () => ({
    type: CHATS_LOAD,
});

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

