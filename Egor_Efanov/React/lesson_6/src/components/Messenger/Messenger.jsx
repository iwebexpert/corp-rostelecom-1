import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import { MessageList } from 'components/MessageList';
import { MessageForm } from 'components/MessageForm';

import './Messenger.css';
import { chats } from '../../helpers/chatsData';

export class Messenger extends Component {
    render() {
        const { messages, handleMessageSend, handleChatAdd } = this.props;
        return (
            <div className="messenger">
                <button onClick={handleChatAdd}>Добавить новый чат</button>
                {messages ? <MessageList items={messages} /> : 'Пожалуйста, веберите чат слева'}
                {messages && <MessageForm onSend={handleMessageSend} />}
            </div>
        );
    }
}