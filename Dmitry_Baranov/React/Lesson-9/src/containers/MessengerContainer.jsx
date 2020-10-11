import React, {useEffect} from 'react';
import {nanoid} from 'nanoid';
import {push} from 'connected-react-router';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {Messenger} from 'components/Messenger';
import {
    chatsLoadAction,
    chatsAddAction,
    chatsMessageSendAction,
    chatsFireAction,
    chatsUnfireAction
} from '../actions/chats';

export const MessengerContainer = (props) => {
    const {id} = useParams();

    const dispatch = useDispatch();

    const chats = useSelector((state) => state.chats.entries);
    const messages = chats[id] ? chats[id].messages : null;

    const [isLoading, isError] = useSelector((state) => ([state.chats.loading, state.chats.error]));

    useEffect(() => {
        console.log('componentDidMount - useEffect');
        if (!chats.length) { //  проверка, чтобы при переходе между страницами не сбрасывалось состояние, где хранятся чаты и сообщения
            dispatch(chatsLoadAction());
        }
        // dispatch(chatsLoadAction());
    }, []);

    const handleReloadChats = () => {
        dispatch(chatsLoadAction());
    };

    const handleMessageSend = (message) => {
        dispatch(chatsMessageSendAction({
            ...message,
            chatId: id,
            id: nanoid(),
        }));
    };

    const handleChatAdd = () => {
        const title = prompt('Введите название чата', 'Chat1');
        const lastId = Object.keys(chats).length ? Object.keys(chats).length : 0;

        if (title) {
            dispatch(chatsAddAction(lastId, title));
            dispatch(push(`/chats/${lastId}`));
        } else {
            alert('Введите название чата');
        }
    };

    const handleChatFire = () => {
        dispatch(chatsFireAction(chatId, title, messages, fire));
    };

    const handleChatUnfire = () => {
        dispatch(chatsUnfireAction(chatId, title, messages, fire));
    };

    return <Messenger
        handleReloadChats={handleReloadChats}
        isError={isError}
        isLoading={isLoading}
        messages={messages}
        handleMessageSend={handleMessageSend}
        handleChatAdd={handleChatAdd}
        handleChatFire={handleChatFire}
        handleChatUnfire={handleChatUnfire}
    />
};