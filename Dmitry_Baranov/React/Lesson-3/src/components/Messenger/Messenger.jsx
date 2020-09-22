import React, {Component} from 'react';
import {nanoid} from 'nanoid';

import {MessageList} from 'components/MessageList';
import {MessageForm} from 'components/MessageForm';

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
        isBot: false,
    }

    handleMessageSend = (message) => {
        message.id = nanoid();
        this.setState({
            messages: this.state.messages.concat([message]),
            isBot: false,
        });
    }

    componentDidUpdate() {
        const {author} = this.state.messages[this.state.messages.length - 1];

        if (!this.state.isBot) {
            setTimeout(() => {
                if (!this.state.isBot) {
                    this.setState({
                        messages: this.state.messages.concat([{
                            text: `Hi, ${author}! Чатобот на связи!`,
                            author: 'Чатобот',
                            id: nanoid()
                        }]),
                        isBot: true,
                    });
                }
            }, 2000);
        }
    }

    render() {
        return (
            <div className="messenger">
                <MessageList items={this.state.messages}/>
                <MessageForm onSend={this.handleMessageSend}/>
            </div>
        );
    }
}