import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChatList } from 'components/ChatList';
import { chatsLoadAction, chatsAddAction, chatsDeleteAction } from '../actions/chats';
import { push } from 'connected-react-router';

export const ChatListContainer = (props) => {
    const dispatch = useDispatch();

    const chats = useSelector((state) => state.chats);
    const { loading, error } = chats;

    useEffect(() => {
        dispatch(chatsLoadAction());
    }, []);

    const handleChatAdd = (newchat) => {
        dispatch(chatsAddAction(newchat));

    }

    const handleChatDelete = (chatId) => {
        dispatch(chatsDeleteAction({ chatId }));
    }

    const handleReloadChats = () => {
        dispatch(chatsLoadAction());
    };

    const handlePushLink = (link) => {
        dispatch(push(link))
    }

    return <ChatList chats={chats}
        push={handlePushLink}
        handleChatAdd={handleChatAdd}
        handleChatDelete={handleChatDelete}
        handleReloadChats={handleReloadChats}
        isLoading={loading}
        isError={error}
    />
}