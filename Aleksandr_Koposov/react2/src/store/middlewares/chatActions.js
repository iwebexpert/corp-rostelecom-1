import {
    CHAT_MESSAGE_DEL,
    chatDeleteMessageApiAction,

    CHAT_DEL,
    chatDeleteApiAction,

    CHAT_MESSAGE_SEND,
    chatMessageSendApiAction,

    CHAT_ADD,
    chatAddApiAction
} from 'actions/chats'

export const chatActionsMiddleware = store => next => action => {

    if ([CHAT_MESSAGE_DEL, CHAT_DEL, CHAT_MESSAGE_SEND, CHAT_ADD].includes(action.type)) {
        const { chatId, messageId } = action.payload || {}

        if (action.type === CHAT_MESSAGE_DEL) {
            const index = store.getState().chats.entries
                .find(i => i.id === chatId).messages
                .map(i => i.id)
                .indexOf(messageId)
            store.dispatch(chatDeleteMessageApiAction(messageId, index, chatId))
        }

        if (action.type === CHAT_DEL) {
            const index = store.getState().chats.entries
                .map(i => i.id)
                .indexOf(chatId)
            store.dispatch(chatDeleteApiAction(index, chatId))
        }

        if (action.type === CHAT_ADD) {
            store.dispatch(chatAddApiAction(action.payload))
        }

        if (action.type === CHAT_MESSAGE_SEND) {
            const { chatId, message } = action.payload
            store.dispatch(chatMessageSendApiAction(chatId, message))
        }
    }
    return next(action)
}
