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


    componentDidUpdate(prevProps, prevState) {

        const currentName = this.state.messages[this.state.messages.length - 1].author;
        const prevName = prevState.messages[prevState.messages.length - 1].author;
        if (![prevName, 'Messenger'].includes(currentName) && prevName !== 'Messenger') {

            this.setState({
                messages: this.state.messages.concat([{
                    text: 'Привет, ' + currentName + '!',
                    author: 'Messenger',
                }]),
            });
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
