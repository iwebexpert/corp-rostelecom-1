import {nanoid} from 'nanoid';
import {CHATS_MESSAGE_SEND, chatsMessageSendAction} from '../actions/chats';

export const botMiddleware = store => next => action => {
    if(action.type === CHATS_MESSAGE_SEND){
        const {chatId, author} = action.payload;

        if(author !== 'Bot'){
            setTimeout(() => {
                if(author !== 'Bot'){
                    store.dispatch(chatsMessageSendAction({id: nanoid(), chatId, author: 'Bot', text: `Привет, ${author}! Это бот.`}));
                }
            }, 3000);
        }
    }
    return next(action);
};