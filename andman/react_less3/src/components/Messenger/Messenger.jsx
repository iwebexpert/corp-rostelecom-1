import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import { MessageList } from 'components/MessageList';
import { ChatList } from 'components/ChatList';
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
        userPost: false,
    }

    handleMessageSend = (message) => {
        message.id = nanoid();
        this.setState({
            messages: this.state.messages.concat([message]),
            //messages: [message].concat(this.state.messages),
            userPost: true,
        });
    }

    componentDidUpdate() {
        document.getElementById('flag').scrollIntoView();
        if (this.state.userPost) {
            setTimeout(() => {
                const { author } = this.state.messages[this.state.messages.length - 1];
                if (author != 'Bot') {
                    this.setState({
                        messages: this.state.messages.concat([{ text: `Hi, ${author}! Бот на связи!`, author: 'Bot', id: nanoid() }]),
                        userPost: false,
                    });
                }
            }, 3000);
        }
    }

    render() {
        return (
            <div className="container">
                <ChatList />
                <div className="messenger">
                    <MessageList items={this.state.messages} />
                    <MessageForm onSend={this.handleMessageSend} />
                </div>
            </div>
        );
    }
}