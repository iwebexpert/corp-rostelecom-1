import React, { Component } from 'react';

import { MessageList } from './MessageList';
import { MessageForm } from './MessageForm';

export class Messenger extends Component {
    state = {
        messages: [
            {
                text: 'Сообщение 1',
                author: 'One',
            }
        ],
    }

    handleMessageSend = (message) => {
        this.setState({
            messages: this.state.messages.concat([message]),
        });
    }

    componentDidUpdate() {

        let messageBot = { text: '- Привет, ' + this.state.messages[this.state.messages.length - 1].author + '!', author: 'Bot' };

        if (this.state.messages[this.state.messages.length - 1].author != 'Bot') {
            this.setState({
                messages: this.state.messages.concat([messageBot]),
            })
        };
    }

    render() {
        return (
            <div>
                <MessageList items={this.state.messages} />
                <MessageForm onSend={this.handleMessageSend} />
            </div>
        );
    }
}