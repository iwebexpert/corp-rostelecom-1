import React, {Component} from 'react';
import { nanoid } from 'nanoid';

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
    }

    handleMessageSend = (message) => {
        message.id = nanoid();
        this.setState({
            messages: this.state.messages.concat([message]),
        });
    }

    componentDidUpdate()
    {
        const lastMessage = this.state.messages[this.state.messages.length-1];
        if(lastMessage.author != 'robot'){
            this.setState({
                messages: this.state.messages.concat([{text :lastMessage.author +' написал "'+lastMessage.text+'"', author : 'robot', id: nanoid()}]),
            });
        }
    }

    render(){
        return (
        <div className="messenger">
            <MessageList items={this.state.messages} />
            <MessageForm onSend={this.handleMessageSend} />
        </div>
        );
    }
}