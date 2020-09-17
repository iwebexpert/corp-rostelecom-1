import React, {Component} from 'react';

import {MessageList} from './MessageList';
import {MessageForm} from './MessageForm';

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

    componentDidUpdate()
    {
        const lastMessage = this.state.messages[this.state.messages.length-1]
        console.log(lastMessage)
        if(lastMessage.author != 'robot'){
            this.setState({
                messages: this.state.messages.concat([{text :lastMessage.author +' написал "'+lastMessage.text+'"', author : 'robot'}]),
            });
        }
    }

    render(){
        return (
        <div>
            <MessageList items={this.state.messages} />
            <MessageForm onSend={this.handleMessageSend} />
        </div>
        );
    }
}