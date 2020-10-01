import React, { Component } from 'react';


import { MessageList } from 'components/MessageList';
import { MessageForm } from 'components/MessageForm';

import './Messenger.css';

export class Messenger extends Component {


    render() {
        const { messages, handleMessageSend, handleMessageDel, title, chatId, chatIdUniq } = this.props;
        return (
            <div className="messenger">
                <div className="title">{title}</div>
                {messages ? <MessageList chatId={chatId} chatIdUniq={chatIdUniq} items={messages} handleMessageDel={handleMessageDel} /> : 'Пожалуйста, веберите чат слева'}
                {messages && <MessageForm onSend={handleMessageSend} chatIdUniq={chatIdUniq} />}
            </div>
        );
    }
}