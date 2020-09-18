import React, {Component} from 'react';

import {MessageList} from './MessageList';
import {MessageForm} from './MessageForm';

export class Messenger extends Component {
    state = {
        messages: [
            {
                text: 'Приветствую!',
                author: 'Не бот',
            }
        ],
        isBot: false,
    }

    handleMessageSend = (message) => {
        // console.log(this);
        // console.log(message);
        this.setState({
            messages: this.state.messages.concat([message]),
            isBot: false,
        });
    }

    componentDidUpdate() {
        const userName = this.state.messages[this.state.messages.length - 1].author;
        const messageSend = (userName === 'Чатобот') ? {text: 'Это я ЧАТОБОТ!', author: "Чатобот",} : {text: `Привет, ${userName}`, author: "Чатобот",}
        if (!this.state.isBot) {
            setTimeout(() => {
                this.setState({
                    messages: this.state.messages.concat([messageSend]),
                    isBot: true,
                });
            }, 500);
        }

    }

    render() {
        return (
            <div>
                <MessageList items={this.state.messages}/>
                <MessageForm onSend={this.handleMessageSend}/>
            </div>
        );
    }
}