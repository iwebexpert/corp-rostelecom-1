import { nanoid } from 'nanoid';
import { CHATS_MESSAGE_SEND, chatsMessageSendAction, chatsBlinkAction, chatsUnBlinkAction } from '../actions/chats';

export const botMiddleware = store => next => action => {
    if (action.type === '[Chats] MessageSend') {
        const { chatId, author } = action.payload;

        if (author !== 'ReactBot') {
            setTimeout(() => {
                if (author !== 'ReactBot') {
                    store.dispatch(
                        chatsMessageSendAction({ id: nanoid(), chatId, author: 'ReactBot', text: `Привет, ${author}! Это бот.` }),
                    );
                    store.dispatch(
                        store.dispatch(chatsBlinkAction({ chatId })),
                    );
                    setTimeout(() => {
                        store.dispatch(
                            store.dispatch(chatsUnBlinkAction()),
                        )
                    }, 3000);
                }
            }, 3000);
        }
    };
    return next(action);
};