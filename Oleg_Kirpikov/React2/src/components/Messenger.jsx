import React, { Component } from 'react';

import { MessageList } from './MessageList';
import { MessageForm } from './MessageForm';

export class Messenger extends Component {
    state = {
        messages: [
            {
                text: 'Сообщение',
                author: 'Тест',
                classStyle: 'right',
            }
        ],
    }

    handleMessageSend = (message) => {
        this.setState({
            messages: this.state.messages.concat({ ...message, classStyle: 'right' }),
        });
    }

    componentDidUpdate() {
        if (['ReactBot'].indexOf(this.state.messages[this.state.messages.length - 1].author, 0) == -1) {
            setTimeout(() => {
                this.setState(
                    {
                        messages: this.state.messages.concat({
                            author: 'ReactBot',
                            text: `${this.state.messages[this.state.messages.length - 1].author} не приставай ко мне, я робот!`,
                            classStyle: 'left'
                        })
                    })
            },
                1000);

        }
    }

    render() {
        return (
            <div>
                <div class="messenger">
                    <MessageList items={this.state.messages} />
                </div>
                <MessageForm onSend={this.handleMessageSend} />
            </div>
        );
    }
}