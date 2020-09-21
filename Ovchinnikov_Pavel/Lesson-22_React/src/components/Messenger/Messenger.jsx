import React, { Component } from 'react';
import { BottomNavigation } from '@material-ui/core';
import { nanoid } from 'nanoid';
import { MessageList } from 'components/MessageList';
import { MessageForm } from 'components/MessageForm';
import './Messenger.css';

export class Messenger extends Component {
    state = {
        messages: [
            {
                text: '',
                author: '',
                my: true,
                id: nanoid()
            }
        ],
    }

    timeout = null;

    handleMessageSend = (message) => {
        message.id = nanoid();
        this.setState({
            messages: this.state.messages.concat([message]),
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.messages[this.state.messages.length - 1].my) {
            let author = this.state.messages[this.state.messages.length - 1].author;
            let txt = this.state.messages[this.state.messages.length - 1].text.trim();
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

            /*this.setState({
                messages: this.state.messages.concat([messageBot]),
            })*/

            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                let messageBot = { text: answer, author: 'АвтоБот', id: nanoid(), my: false };
                this.setState({
                    messages: this.state.messages.concat([messageBot]),
                });
            }, 1000);
        }
    }

    componentWillUnmount() {
        // На всякий случай освобождаем таймер
        clearTimeout(this.timeout);
    }

    render() {
        return (
            <div className="messenger">
                <MessageForm onSend={this.handleMessageSend} />
                <MessageList items={this.state.messages} />
            </div >
        );
    }
}
