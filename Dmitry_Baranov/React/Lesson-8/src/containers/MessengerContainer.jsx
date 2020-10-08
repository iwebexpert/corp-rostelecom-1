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
    const dispacth = useDispatch();

    const chats = useSelector((state) => state.chats.entries);
    const messages = chats[id] ? chats[id].messages : null;

    const [isLoading, isError] = useSelector((state) => ([state.chats.loading, state.chats.error]));

    useEffect(() => {
        console.log('componentDidMount - useEffect');
        dispacth(chatsLoadAction());
    }, []);

    const handleReloadChats = () => {
        dispacth(chatsLoadAction());
    };

    const handleMessageSend = (message) => {
        dispacth(chatsMessageSendAction({
            ...message,
            chatId: id,
            id: nanoid(),
        }));
    };

    const handleChatAdd = () => {
        const title = prompt('Введите название чата', 'Chat1');
        const lastId = Object.keys(chats).length ? Object.keys(chats).length : 0;

        if (title) {
            dispacth(chatsAddAction(lastId, title));
            dispacth(push(`/chats/${lastId}`));
        } else {
            alert('Введите название чата');
        }
    };

    const handleChatFire = () => {
        dispacth(chatsFireAction(chatId, title, messages, fire));
    };

    const handleChatUnfire = () => {
        dispacth(chatsUnfireAction(chatId, title, messages, fire));
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