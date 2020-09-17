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
        console.log('update. componentDidUpdate', prevProps, prevState);

        if (this.state.messages[this.state.messages.length - 1].author !== 'bot') {
            setTimeout(() => {

                const messageBot = { text: `Привет ${this.state.messages[this.state.messages.length - 1].author}`, author: 'bot' };



                this.setState({
                    messages: this.state.messages.concat([messageBot]),
                });


            },
                1000);

        }

    }

    render() {
        return (
            <div>
                <MessageList items={this.state.messages} />
                <MessageForm onSend={this.handleMessageSend} />
            </div >
        );
    }
}