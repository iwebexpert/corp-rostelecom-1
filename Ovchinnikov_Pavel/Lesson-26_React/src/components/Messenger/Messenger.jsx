import React, { Component } from 'react';
import { MessageList } from 'components/MessageList';
import { MessageForm } from 'components/MessageForm';
import './Messenger.css';

export class Messenger extends Component {
    render() {
        const { messages, handleMessageSend, handleChatAdd, isLoading, isError, handleReloadChats } = this.props;

        console.log("isLoading: " + isLoading);
        console.log("isError: " + isError);

        if (isError) {
            return (<div>Не удалось загрузить чаты... <button onClick={handleReloadChats}>Загрузить повторно</button></div>);
        }

        if (isLoading) {
            return (<div>Loading...</div>);
        }

        return (
            <div className="messenger">
                {messages && <MessageForm onSend={handleMessageSend} />}
                {messages ? <MessageList items={messages} /> : 'Пожалуйста, веберите чат слева'}
            </div>
        );
    }
}