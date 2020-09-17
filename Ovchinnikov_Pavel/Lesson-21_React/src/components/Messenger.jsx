import React, { Component } from 'react';

import { MessageList } from './MessageList';
import { MessageForm } from './MessageForm';

export class Messenger extends Component {
    state = {
        messages: [
            {
                // text: '',
                // author: '',
            }
        ],
    }

    handleMessageSend = (message) => {
        this.setState({
            messages: this.state.messages.concat([message]),
        });
    }

    componentDidUpdate(prevProps, prevState) {
        let author = this.state.messages[this.state.messages.length - 1].author;
        if (author != 'АвтоБот') {
            let txt = this.state.messages[this.state.messages.length - 1].text.trim();
            let answer = '';

            switch (txt.toUpperCase()) {
                case '?':
                case 'help'.toUpperCase():
                case 'h'.toUpperCase():
                    answer = "? help h - справка по командам; time время - местное время";
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

            let messageBot = { text: answer, author: 'АвтоБот' };
            this.setState({
                messages: this.state.messages.concat([messageBot]),
            })
        }
    }

    render() {
        return (
            <div>
                <MessageForm onSend={this.handleMessageSend} />
                <MessageList items={this.state.messages} />
            </div>
        );
    }
}
