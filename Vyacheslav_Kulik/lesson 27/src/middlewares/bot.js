import {ADD_MESSAGES_CHATS_SUCCESS, addChatsMessageFetchAction, firedChatAction} from '../actions/chats'
import moment from 'moment'
import {nanoid} from 'nanoid'


let botAnswerTimer
let chatIdBotAnswer
export const botAnswersMiddleware = store => next => action => {
    if (action.type === ADD_MESSAGES_CHATS_SUCCESS) {
        const {chatId, ...message} = action.payload
        if (message.author !== 'Bot') {
            botAnswerTimer && chatIdBotAnswer === chatId && clearTimeout(botAnswerTimer) // сбрасываем таймер,  если бот уже отвечает в чат с id=chatId
            const botMessage = {
                        text: `Привет, <b>${message.author}</b>. Оператор скоро подключится к тебе`,
                        author: 'Bot',
                        time: moment(),
                        id: nanoid()
                    }
            chatIdBotAnswer = chatId
            botAnswerTimer = setTimeout((botMessage, chatId) => {
                store.dispatch(addChatsMessageFetchAction(botMessage, chatId))// отправляем сообщение
                store.dispatch(firedChatAction(chatId))//помечаем непрочитанным
            }, 2000, botMessage, chatId)
        }
    }
    next(action)
}