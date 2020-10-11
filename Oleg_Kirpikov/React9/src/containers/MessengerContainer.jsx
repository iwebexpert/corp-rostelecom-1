import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


import { nanoid } from 'nanoid';

import { Messenger } from 'components/Messenger';
import { chatsMessageSendAction, chatsMessageDeleteAction } from '../actions/chats';

export const MessengerContainer = (props) => {
    const { id } = useParams();

    const chats = useSelector((state) => state.chats.entries);
    const messages = chats[id] ? chats[id].messages : null;
    const chatTitle = chats[id] ? chats[id].title : '';
    const [isLoading, isError] = useSelector((state) => ([state.chats.loading, state.chats.error]));

    const dispatch = useDispatch();

    const handleMessageSend = (message) => {
        dispatch(chatsMessageSendAction({
            ...message,
            chatId: id,
            id: nanoid(),
        }));
    }

    const handleMessageDelete = (chatId, id) => {
        dispatch(chatsMessageDeleteAction({ chatId, id }));
    }

    const handleReloadChats = () => {
        dispatch(chatsLoadAction());
    };


    return <Messenger {...props}
        isLoading={isLoading}
        isError={isError}
        chatId={id}
        messages={messages}
        chatTitle={chatTitle}
        onAdd={handleMessageSend}
        handleMessageDelete={handleMessageDelete}
        handleReloadChats={handleReloadChats}
    />

}