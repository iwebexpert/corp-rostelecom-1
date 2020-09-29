import React, {Component} from 'react';
import { nanoid } from 'nanoid';

import {MessageList} from 'components/MessageList';
import {MessageForm} from 'components/MessageForm';

import './Messenger.css';
import {chats} from '../../helpers/chatsData';

export class Messenger extends Component {

    // componentDidUpdate()
    // {
    //     if(this.messages && this.messages.length){
    //         const {author} = this.messages[this.messages.length - 1];
    //         if(author !== 'Bot'){
    //             setTimeout(() => {
    //                 this.handleMessageSend({text: `Привет, ${author}! Это бот.`, author: 'Bot'});
    //             }, 1000);
    //         }
    //     }
    // }

    render(){
        const {messages, handleMessageSend} = this.props;
        return (
        <div className="messenger">
            {messages ? <MessageList items={messages} /> : 'Пожалуйста, веберите чат слева'}
            {messages && <MessageForm onSend={handleMessageSend} />}
        </div>
        );
    }
}