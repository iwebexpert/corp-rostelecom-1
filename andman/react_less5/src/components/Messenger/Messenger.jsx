import React, { Component } from 'react';


import { MessageList } from 'components/MessageList';
import { MessageForm } from 'components/MessageForm';

import './Messenger.css';

export class Messenger extends Component {


    render() {
        const { messages, handleMessageSend, title } = this.props;
        return (
            <div className="messenger">
                <div className="title">{title}</div>
                {messages ? <MessageList items={messages} /> : 'Пожалуйста, веберите чат слева'}
                {messages && <MessageForm onSend={handleMessageSend} />}
            </div>
        );
    }
}