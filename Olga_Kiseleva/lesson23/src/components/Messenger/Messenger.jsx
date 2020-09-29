import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import { MessageList } from 'components/MessageList';
import { MessageForm } from 'components/MessageForm';

import './Messenger.css';
import { chats } from '../../helpers/chatsData';

export class Messenger extends Component {
    state = {
        chats,
    }

    handleMessageSend = (message) => {
        // console.log('match.params', match.params);
        // console.log('this.state', this.state);
        const { chats } = this.state;
        const { match } = this.props;

        message.id = nanoid();
        console.log('this.props', this.props);
        const chat = chats[match.params.id];
        // console.log(chats);

        // console.log(chats[match.params.id]);
        chat.messages = this.messages.concat([message])

        console.log('this.state', this.state);
        this.setState({
            chats: {
                ...chats,
                [match.params.id]: chat,
            },
        });

    }

    componentDidUpdate() {
        if (this.messages && this.messages.length) {
            const { author } = this.messages[this.messages.length - 1];
            if (author !== 'Bot') {
                setTimeout(() => {
                    this.handleMessageSend({ text: `Привет, ${author}! Это бот.`, author: 'Bot' });
                }, 1000);
            }
        }
    }

    get messages() {
        const { chats } = this.state;
        const { match } = this.props;

        let messages = null;
        if (match && chats[match.params.id]) {
            messages = chats[match.params.id].messages;
        }
        return messages;
    }

    render() {
        //console.log(this.props);
        return (
            <div className="messenger">
                {this.messages ? <MessageList items={this.messages} /> : 'Пожалуйста, веберите чат слева'}
                <MessageForm onSend={this.handleMessageSend} />
                {/* {this.chat && <MessageForm onSend={this.handleMessageSend} />} */}
                {/* {this.messages && <MessageForm onSend={this.handleMessageSend} />} */}
            </div>
        );
    }
}
