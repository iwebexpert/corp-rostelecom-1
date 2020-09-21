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
        this.setState({
            messages: this.state.messages.concat([message]),
        });
    }

    componentDidUpdate() {
        if (['ReactBot'].indexOf(this.state.messages[this.state.messages.length - 1].author, 0) == -1) {
            setTimeout(() => {
                if (['ReactBot'].indexOf(this.state.messages[this.state.messages.length - 1].author, 0) == -1) {
                    this.setState(
                        {
                            messages: this.state.messages.concat({
                                author: 'ReactBot',
                                text: `${this.state.messages[this.state.messages.length - 1].author} не приставай ко мне, я робот!`,
                                id: nanoid(),
                            })
                        })
                }
            },
                1000);
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