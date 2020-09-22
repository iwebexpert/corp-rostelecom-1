import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import { MessageList } from 'components/MessageList';
import { MessageForm } from 'components/MessageForm';

import './Messenger.css';

export class Messenger extends Component {
    state = {
        messages: [
            {
                text: 'Сообщение 1',
                author: 'One',
                id: nanoid(),
            }
        ],
    }

    handleMessageSend = (message) => {
        message.id = nanoid();
        // console.log(this);
        // console.log(message);
        this.setState({
            messages: this.state.messages.concat([message]),
            //messages: [message].concat(this.state.messages),
        });
    }

    componentDidUpdate() {
        const { author } = this.state.messages[this.state.messages.length - 1];
        if (author !== 'bot') {
            setTimeout(() => {
                this.setState({
                    messages: this.state.messages.concat([{
                        text: `Hi, ${author}! I tell you not to disturb me!`,
                        author: 'bot',
                        id: nanoid()
                    }])
                });
            }, 1000);
        }
    }

    render() {
        return (
            <div className="messenger">
                <MessageList items={this.state.messages} />
                <MessageForm onSend={this.handleMessageSend} />
            </div>
        );
    }
}