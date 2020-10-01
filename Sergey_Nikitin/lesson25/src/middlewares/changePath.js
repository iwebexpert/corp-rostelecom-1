import { nanoid } from 'nanoid';
import { LOCATION_CHANGE } from 'react-router-redux';

export const pathChangeMiddleware = store => next => action => {
    if (action.type === LOCATION_CHANGE) {
        const { chatId, author } = action.payload;

        if (author !== 'Bot') {
            setTimeout(() => {
                if (author !== 'Bot') {
                    store.dispatch(chatsMessageSendAction({ id: nanoid(), chatId, author: 'Bot', text: `Привет, ${author}! Это бот.` }));

                }
            }, 3000);
        }
    }
    return next(action);
};