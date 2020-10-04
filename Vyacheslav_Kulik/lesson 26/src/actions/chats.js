import { createAction } from 'redux-api-middleware'
export const LOAD_CHATS = 'LOAD_CHATS'
export const ADD_MESSAGES_CHATS = 'ADD_MESSAGES_CHATS'
export const DELETE_MESSAGES_CHATS = 'DELETE_MESSAGES_CHATS'
export const ADD_NEW_CHAT = 'ADD_NEW_CHAT'
export const FIRED_CHAT = 'FIRED_CHAT'
export const UNFIRED_CHAT = 'UNFIRED_CHAT'

export const LOAD_CHATS_REQUEST = 'LOAD_CHATS/LOAD_CHATS_REQUEST'
export const LOAD_CHATS_SUCCESS = 'LOAD_CHATS/LOAD_CHATS_SUCCESS'
export const LOAD_CHATS_FAILURE = 'LOAD_CHATS/LOAD_CHATS_FAILURE'

export const DELETE_MESSAGES_CHATS_REQUEST = 'DELETE_MESSAGES_CHATS/DELETE_MESSAGES_CHATS_REQUEST'
export const DELETE_MESSAGES_CHATS_SUCCESS = 'DELETE_MESSAGES_CHATS/DELETE_MESSAGES_CHATS_SUCCESS'
export const DELETE_MESSAGES_CHATS_FAILURE = 'DELETE_MESSAGES_CHATS/DELETE_MESSAGES_CHATS_FAILURE'

export const ADD_MESSAGES_CHATS_REQUEST = 'ADD_MESSAGES_CHATS/ADD_MESSAGES_CHATS_REQUEST'
export const ADD_MESSAGES_CHATS_SUCCESS = 'ADD_MESSAGES_CHATS/ADD_MESSAGES_CHATS_SUCCESS'
export const ADD_MESSAGES_CHATS_FAILURE = 'ADD_MESSAGES_CHATS/ADD_MESSAGES_CHATS_FAILURE'

export const ADD_NEW_CHAT_REQUEST = 'ADD_NEW_CHAT/ADD_NEW_CHAT_REQUEST'
export const ADD_NEW_CHAT_SUCCESS = 'ADD_NEW_CHAT/ADD_NEW_CHAT_SUCCESS'
export const ADD_NEW_CHAT_FAILURE = 'ADD_NEW_CHAT/ADD_NEW_CHAT_FAILURE'



export const loadChatsAction = () => createAction({
    endpoint: '/api/chats?_embed=messages',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    types: [
        LOAD_CHATS_REQUEST,
        LOAD_CHATS_SUCCESS,
        LOAD_CHATS_FAILURE
    ]
})


// export const loadChatsAction = () => ({
//     type: LOAD_CHATS
// })

export const addChatsMessageAction = (message, chatId) => ({
    type: ADD_MESSAGES_CHATS,
    payload: {message: message, chatId}
})


export const addChatsMessageFetchAction = (message, chatId) => createAction({
    endpoint: '/api/messages',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body:  JSON.stringify({...message, chatId: parseInt(chatId)}),
    types: [
        {
            type: ADD_MESSAGES_CHATS_REQUEST,
            payload: {...message, chatId: parseInt(chatId)}
        },
        {
            type: ADD_MESSAGES_CHATS_SUCCESS,
            payload: async (action, state, res) => {return await res.json()}
        },
        // ADD_MESSAGES_CHATS_SUCCESS,
        ADD_MESSAGES_CHATS_FAILURE
    ]
})

export const deleteChatsMessageAction = (messageId, chatId) => ({
    type: DELETE_MESSAGES_CHATS,
    payload: {messageId, chatId}
})

export const deleteChatsMessageFetchAction = (messageId, indexDeleteMessage, chatId) => createAction({
    endpoint: `/api/messages/${messageId}`,
    method: 'DELETE',
    types: [
        {
            type: DELETE_MESSAGES_CHATS_REQUEST,
            payload: messageId
        },
        {
            type: DELETE_MESSAGES_CHATS_SUCCESS,
            payload: {messageId: indexDeleteMessage, chatId}
        },
        DELETE_MESSAGES_CHATS_FAILURE
    ]
})

export const addNewChatAction = (title) => ({
    type: ADD_NEW_CHAT,
    payload: title
})

export const addNewChatFetchAction = (title) => createAction({
    endpoint: '/api/chats',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body:  JSON.stringify({
        title: title,
        srcAvatar: 'src/img/bot.svg',
        fired: false
    }),
    types: [
        ADD_NEW_CHAT_REQUEST,
        {
            type: ADD_NEW_CHAT_SUCCESS,
            payload: async (action, state, res) => {return await res.json()}
        },
        ADD_NEW_CHAT_FAILURE
    ]
})

export const firedChatAction = (chatId) => ({
    type: FIRED_CHAT,
    payload: chatId
})

export const unfiredChatAction = (chatId) => ({
    type: UNFIRED_CHAT,
    payload: chatId
})
