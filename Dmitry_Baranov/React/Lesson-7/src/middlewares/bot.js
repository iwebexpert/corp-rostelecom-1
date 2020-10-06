import {nanoid} from 'nanoid';
import {CHATS_MESSAGE_SEND, chatsMessageSendAction, chatsFireAction, chatsUnfireAction} from '../actions/chats';


export const botMiddleware = store => next => action => {
    if (action.type === CHATS_MESSAGE_SEND) {

        const {chatId, author} = action.payload;

        const len = store.getState().chats.entries[chatId].messages.length;
        if (author !== 'Bot') {
            setTimeout(() => {
                let lenNew = store.getState().chats.entries[chatId].messages.length;
                if (len + 1 === lenNew) {
                    store.dispatch(chatsMessageSendAction({
                        id: nanoid(),
                        chatId,
                        text: `Привет, ${author}!`,
                        author: 'Bot'
                    }));
                    store.dispatch(chatsFireAction(chatId, store.getState().chats.entries[chatId].title, store.getState().chats.entries[chatId].fire, store.getState().chats.entries[chatId].messages));

                    setTimeout(() => {
                        store.dispatch(chatsUnfireAction(chatId, store.getState().chats.entries[chatId].title, store.getState().chats.entries[chatId].fire, store.getState().chats.entries[chatId].messages));
                    }, 1000);
                }
            }, 3000);

        }
    }
    return next(action);
};