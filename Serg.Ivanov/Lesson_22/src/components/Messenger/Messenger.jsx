import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import { MessageList } from 'components/MessageList';
import { MessageForm } from 'components/MessageForm';

import './Messenger.css';

export class Messenger extends Component {
    state = {
        messages: [
            {
                text: 'Hi People',
                author: 'Bot',
                id: nanoid(),
            }
        ],
    }

    handleMessageSend = (message) => {
        message.id = nanoid();

        this.setState({
            messages: this.state.messages.concat([message]),

        });
    }


    componentDidUpdate() {
        const len = this.state.messages.length;
        const { author } = this.state.messages[len - 1];

        if (author !== 'Bot') {
            setTimeout(() => {
                let lenNew = this.state.messages.length;
                if (len === lenNew)
                    this.setState({
                        messages: this.state.messages.concat([{ text: `Hi, ${author}!`, author: 'Bot', id: nanoid() }])
                    });
            }, 2000);
        };


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