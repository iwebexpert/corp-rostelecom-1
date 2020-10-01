import { nanoid } from 'nanoid';
import { CHATS_MESSAGE_SEND, chatsMessageSendAction, chatFireAction } from '../actions/chats';

export const botMiddleware = store => next => action => {
    if (action.type === CHATS_MESSAGE_SEND) {
        const { chatIdUniq, author } = action.payload;
        if (author !== 'Bot') {
            setTimeout(() => {
                const currentStore = store.getState();
                let location = currentStore.router.location.pathname;
                //console.log(location);
                let chatIndex = currentStore.chats.entries.findIndex((e, index, array) => (e.id === chatIdUniq));
                const messages = currentStore.chats.entries[chatIndex].messages;
                let authorLastMessage = messages[messages.length - 1].author;
                if (authorLastMessage != 'Bot') {
                    store.dispatch(chatsMessageSendAction({ id: nanoid(), chatIdUniq, author: 'Bot', text: `Привет, ${author}! Это бот.` }));
                    if (`/chats/${chatIndex}` != location) {
                        store.dispatch(chatFireAction(chatIdUniq));
                    }
                }
            }, 3000);
        }
    }
    return next(action);
};