import { nanoid } from 'nanoid';
import { CHATS_MSG_ADD_SUCCESS, chatsMessageSendAction, chatFireAction } from '../actions/chats';

export const botMiddleware = store => next => action => {
    if (action.type === CHATS_MSG_ADD_SUCCESS) {
        const { chatId, author } = action.payload;
        if (author !== 'Bot') {
            setTimeout(() => {
                const currentStore = store.getState();
                let location = currentStore.router.location.pathname;
                //console.log(location);
                let chatIndex = currentStore.chats.entries.findIndex((e, index, array) => (e.id === chatId));
                const messages = currentStore.chats.entries[chatIndex].messages;
                let authorLastMessage = messages[messages.length - 1].author;
                if (authorLastMessage != 'Bot') {
                    store.dispatch(chatsMessageSendAction({ id: nanoid(), chatId, author: 'Bot', text: `Привет, ${author}! Это бот.` }));
                    if (`/chats/${chatIndex}` != location) {
                        store.dispatch(chatFireAction(chatId));
                    }
                }
            }, 3000);
        }
    }
    return next(action);
};