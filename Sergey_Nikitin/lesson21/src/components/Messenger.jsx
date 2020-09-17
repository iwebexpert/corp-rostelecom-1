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
    }

    handleMessageSend = (message) => {
        // console.log(this);
        // console.log(message);
        this.setState({
            messages: this.state.messages.concat([message]),
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) { //что такое snapshot в данном контексте? а то он так undefined...
        //TODO
        /* this.state.messages.push({ //первый вариант но тут не вызывалась перерисовка так как не вызывалась setState
             text: 'Сообщение 1',
             author: 'BOT',
         });*/
        if (this.state.messages.length != prevState.messages.length && this.state.messages[this.state.messages.length - 1].author != "BOT") {//проверяем не был ли последним бот иначе зацикливается
            console.log(prevProps);
            console.log(prevState);
            console.log(snapshot);
            this.setState({
                messages: this.state.messages.concat([{
                    text: ('Услышал вас ' + this.state.messages[this.state.messages.length - 1].author),//берем последний элемент и выдираем автора (P.s. По хорошему надо наверно сравнивать prevState с текущим и смотреть что поменялось )
                    author: 'BOT',
                }]),
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