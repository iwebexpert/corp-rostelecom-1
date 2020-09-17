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
        userPost: false,
    }

    handleMessageSend = (message) => {
        this.setState({
            messages: this.state.messages.concat([message]),
            userPost: true,
        });
    }

    componentDidUpdate() {

        if (this.state.userPost) { //Сообщение отправил реальный пользователь, а не робот
            const lastMessage = this.state.messages[this.state.messages.length - 1]; //Из массива сообщений получаем последнее 
            this.setState({
                messages: this.state.messages.concat([{ text: `${lastMessage.author}: ${lastMessage.text}`, author: "Robot", }]),
                userPost: false,
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