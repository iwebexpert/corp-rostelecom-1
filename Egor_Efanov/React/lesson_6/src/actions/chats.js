export const CHATS_LOAD = 'CHATS_LOAD';
export const CHATS_ADD = 'CHATS_ADD';
export const CHATS_MESSAGE_SEND = 'CHATS_MESSAGE_SEND';

//TODO
export const CHATS_FIRE = 'CHATS_FIRE';
export const CHATS_UNFIRE = 'CHATS_UNFIRE';

export const chatsLoadAction = () => ({
    type: CHATS_LOAD,
});

export const chatsMessageSendAction = (message) => ({
    type: CHATS_MESSAGE_SEND,
    payload: message,
});



export const chatsAddAction = (chatId, title) => ({
    type: CHATS_ADD,
    payload: { chatId, title },
});


export const chatsFireAction = (chatId, title, fire, messages) => ({
    type: CHATS_FIRE,
    payload: { chatId, title, fire, messages },
});

export const chatsUnfireAction = (chatId, title, fire, messages) => ({
    type: CHATS_UNFIRE,
    payload: { chatId, title, fire, messages },
}); 