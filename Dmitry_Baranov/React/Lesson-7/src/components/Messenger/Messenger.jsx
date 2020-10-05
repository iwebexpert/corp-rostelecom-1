import React, {Component} from 'react';

import {MessageList} from '../MessageList';
import {MessageForm} from '../MessageForm';

import './Messenger.css';


export class Messenger extends Component {
    render() {
        const { messages, handleMessageSend, handleChatAdd, isLoading, isError, handleReloadChats } = this.props;

        if (isError) {
            return (<div>Не удалось загрузить чаты... <button onClick={handleReloadChats}>Загрузить повторно</button></div>);
        }

        if (isLoading) {
            return (<div>Loading...</div>);
        }

        return (
            <div className="messenger">
                <button onClick={handleChatAdd}>Добавить новый чат</button>
                {messages ? <MessageList items={messages} /> : 'Пожалуйста, веберите чат слева'}
                {messages && <MessageForm onSend={handleMessageSend} />}
            </div>
        );
    }
}