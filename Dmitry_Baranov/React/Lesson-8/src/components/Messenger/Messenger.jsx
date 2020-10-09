import React, {Component} from 'react';

import {MessageList} from 'components/MessageList';
import {MessageForm} from 'components/MessageForm';

import './Messenger.css';

export const Messenger = (props) => {
    const {messages, handleMessageSend, handleChatAdd, isLoading, isError, handleReloadChats} = props;

    if (isError) {
        return (
            <div>Не удалось загрузить чаты... <button onClick={handleReloadChats}>Загрузить повторно</button></div>);
    }

    if (isLoading) {
        return (<div>Loading...</div>);
    }

    return (
        <div className="messenger">
            <button onClick={handleChatAdd}>Добавить новый чат</button>
            {messages ? <MessageList items={messages}/> : 'Пожалуйста, веберите чат слева'}
            {messages && <MessageForm onSend={handleMessageSend}/>}
        </div>
    );
}