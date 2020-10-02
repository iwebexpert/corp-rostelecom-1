import { nanoid } from 'nanoid';
import { CHATS_MESSAGE_SEND, chatsMessageSendAction } from '../actions/chats';

var timeout = null;

export const botMiddleware = store => next => action => {
    if (action.type === CHATS_MESSAGE_SEND) {
        const { chatId, author, my, text } = action.payload;

        if (my) {

            let answer = '';

            switch (text.toUpperCase()) {
                case '?':
                case 'help'.toUpperCase():
                case 'h'.toUpperCase():
                    answer = "? help h - справка по командам; t time время - местное время";
                    break
                case 't'.toUpperCase():
                case 'time'.toUpperCase():
                case 'время'.toUpperCase():
                    answer = (new Date()).toLocaleString();
                    break
                case 'hi'.toUpperCase():
                case 'привет'.toUpperCase():
                    answer = "Привет, " + author;
                    break
                default:
                    answer = "Уважаемый " + author + ", я Вас не понимаю, повторите, пожалуйста, вопрос. Для вызова справки нажмите '?'";
                    break
            }

            clearTimeout(timeout);
            timeout = setTimeout(() => {
                store.dispatch(chatsMessageSendAction({ id: nanoid(), chatId, author: 'АвтоБот', text: answer }));
            }, 3000);
        }
    }
    return next(action);
};