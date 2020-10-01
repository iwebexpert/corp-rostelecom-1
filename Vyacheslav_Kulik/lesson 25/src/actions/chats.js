export const LOAD_CHATS = 'LOAD_CHATS'
export const ADD_MESSAGES_CHATS = 'ADD_MESSAGES_CHATS'
export const ADD_NEW_CHAT = 'ADD_NEW_CHAT'
export const FIRED_CHAT = 'FIRED_CHAT'
export const UNFIRED_CHAT = 'UNFIRED_CHAT'

export const loadChatsAction = () => ({
    type: LOAD_CHATS
})

export const addChatsMessageAction = (message, chatId) => ({
    type: ADD_MESSAGES_CHATS,
    payload: {message: message, chatId}
})

export const addNewChatAction = (title) => ({
    type: ADD_NEW_CHAT,
    payload: title
})

export const firedChatAction = (chatId) => ({
    type: FIRED_CHAT,
    payload: chatId
})

export const unfiredChatAction = (chatId) => ({
    type: UNFIRED_CHAT,
    payload: chatId
})
