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
        // console.log(this);
        // console.log(message);
        this.setState({
            messages: this.state.messages.concat([message]),
        });
    }

    componentDidUpdate() {
        let author = this.state.messages[this.state.messages.length - 1].author;
        if (author != 'Bot') {
            this.setState(
                {
                    messages: this.state.messages.concat({
                        author: 'Bot',
                        text: `${this.state.messages[this.state.messages.length - 1].author}, привет! Это бот.`,
                    })
                })
        }
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