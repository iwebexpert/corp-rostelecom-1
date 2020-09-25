import React, {Component} from 'react';
import { nanoid } from 'nanoid';

import {MessageList} from 'components/MessageList';
import {MessageForm} from 'components/MessageForm';

import './Messenger.css';
import {chats} from '../../helpers/chatsData';

export class Messenger extends Component {
    state = {
        chats,
    }

    handleMessageSend = (message) => {
        const {chats} = this.state;
        const {match} = this.props;

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

    componentDidUpdate()
    {
        if(this.messages && this.messages.length){
            const {author} = this.messages[this.messages.length - 1];
            if(author !== 'Bot'){
                setTimeout(() => {
                    this.handleMessageSend({text: `Привет, ${author}! Это бот.`, author: 'Bot'});
                }, 1000);
            }
        }
    }

    get messages(){
        const {chats} = this.state;
        const {match} = this.props;

        let messages = null;
        if(match && chats[match.params.id]){
            messages = chats[match.params.id].messages;
        }
        return messages;
    }

    render(){
        //console.log(this.props);
        return (
        <div className="messenger">
            {this.messages ? <MessageList items={this.messages} /> : 'Пожалуйста, веберите чат слева'}
            {this.messages && <MessageForm onSend={this.handleMessageSend} />}
        </div>
        );
    }
}