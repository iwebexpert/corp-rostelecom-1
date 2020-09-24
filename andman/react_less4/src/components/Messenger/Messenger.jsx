import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import { MessageList } from 'components/MessageList';

import { MessageForm } from 'components/MessageForm';

import './Messenger.css';

export class Messenger extends Component {


    get messages() {
        const { chats } = this.props.state;
        const { match } = this.props;

        let messages = null;
        if (match && chats[match.params.id]) {
            messages = chats[match.params.id].messages;
        }
        return messages;
    }
    get chat() {
        const { match } = this.props;
        return match.params.id;
    }


    render() {
        return (
            <div className="messenger">
                {this.messages ? <MessageList items={this.messages} /> : 'Пожалуйста, веберите чат слева'}
                {this.messages && this.chat && <MessageForm onSend={this.props.addMsgHandler} chat={this.chat} />}
            </div>
        );
    }
}