import React, { Component } from 'react';
import { MessageList } from 'components/MessageList';
import { MessageForm } from 'components/MessageForm';
import './Messenger.css';

export class Messenger extends Component {

    render() {
        const { messages, handleMessageSend } = this.props;
        return (
            <div className="messenger">
                {messages && <MessageForm onSend={handleMessageSend} />}
                {messages ? <MessageList items={messages} /> : 'Пожалуйста, веберите чат слева'}
            </div>
        );
    }
}