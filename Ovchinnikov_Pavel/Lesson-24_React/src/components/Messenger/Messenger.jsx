import React, { Component } from 'react';
import { BottomNavigation } from '@material-ui/core';
import { nanoid } from 'nanoid';
import { MessageList } from 'components/MessageList';
import { MessageForm } from 'components/MessageForm';
import './Messenger.css';

import { chats } from '../../helpers/chatsData';

export class Messenger extends Component {

    state = {
        chats,
    }

    timeout = null;

    handleMessageSend = (message) => {
        const { chats } = this.state;
        const { match } = this.props;
        message.id = nanoid();

        const chat = chats[match.params.id];
        chat.messages = this.messages.concat([message])

        this.setState({
            chats: {
                ...chats,
                [match.params.id]: chat,
            },
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.messages && this.messages.length && this.messages[this.messages.length - 1].my) {
            let author = this.messages[this.messages.length - 1].author;
            let txt = this.messages[this.messages.length - 1].text.trim();
            let answer = '';

            switch (txt.toUpperCase()) {
                case '?':
                case 'help'.toUpperCase():
                case 'h'.toUpperCase():
                    answer = "? help h - справка по командам; t time время - местное время";
                    break
                case 't'.toUpperCase():
                case 'time'.toUpperCase():
                case 'время'.toUpperCase():
                    answer = (new Date()).toLocaleString();
                    break
                case 'hi'.toUpperCase():
                case 'привет'.toUpperCase():
                    answer = "Привет, " + author;
                    break
                default:
                    answer = "Уважаемый " + author + ", я Вас не понимаю, повторите, пожалуйста, вопрос. Для вызова справки нажмите '?'";
                    break
            }

            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                let messageBot = { text: answer, author: 'АвтоБот', id: nanoid(), my: false };
                this.handleMessageSend(messageBot);
            }, 1000);
        }
    }

    componentWillUnmount() {
        // На всякий случай освобождаем таймер
        clearTimeout(this.timeout);
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
        return (
            <div className="messenger">
                {this.messages && <MessageForm onSend={this.handleMessageSend} />}
                {this.messages ? <MessageList items={this.messages} /> : 'Пожалуйста, веберите чат слева'}
            </div >
        );
    }
}