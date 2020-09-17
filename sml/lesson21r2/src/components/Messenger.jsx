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

    componentDidUpdate(prevProps, prevState) {
        if (prevState.messages.length % 2) {
            this.setState({
                messages: this.state.messages.concat([{
                    author: 'bot',
                    text: ('I don`t understand ' + this.state.messages[this.state.messages.length - 1].author),
                }]),
            })
        }
    }


    render() {
        return (
            <div>
                <MessageForm onSend={this.handleMessageSend} />
                <MessageList items={this.state.messages} />
            </div>
        );
    }
}