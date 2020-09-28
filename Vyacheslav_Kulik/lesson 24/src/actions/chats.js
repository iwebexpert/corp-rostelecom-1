export const ADD_CHATS = 'ADD_CHATS'
export const ADD_MESSAGES_CHATS = 'ADD_MESSAGES_CHATS'
export const ADD_NEW_CHAT = 'ADD_NEW_CHAT'

export const addChatsAction = () => ({
    type: ADD_CHATS
})

export const addChatsMessageAction = (message) => ({
    type: ADD_MESSAGES_CHATS,
    payload: [...message]
})

export const addNewChatAction = (title) => ({
    type: ADD_NEW_CHAT,
    payload: title
})
