import {nanoid} from 'nanoid';
import {MESSAGE_SEND, messageSendAction} from '../actions/chats';

export const botMiddleware = store => next => action => {
    if(action.type === MESSAGE_SEND){
        const {chatId, author} = action.payload;

        if(author !== 'Bot'){
            setTimeout(() => {
                if(author !== 'robot'){
                    store.dispatch(messageSendAction({id: nanoid(), chatId, author: 'robot', text: `Привет, ${author}! Это бот.`}));
                }
            }, 1000);
        }
    }
    return next(action);
};