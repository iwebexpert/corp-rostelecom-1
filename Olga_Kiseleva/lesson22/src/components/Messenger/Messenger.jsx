import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import { MessageList } from 'components/MessageList';
import { MessageForm } from 'components/MessageForm';

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
        // console.log(this);
        // console.log(message);
        this.setState({
            messages: this.state.messages.concat([message]),
            //messages: [message].concat(this.state.messages),
        });
    }

    componentDidUpdate() {
        const { author } = this.state.messages[this.state.messages.length - 1];
        if (author !== 'Bot') {
            setTimeout(() => {
                const currentAuthor = this.state.messages[this.state.messages.length - 1].author
                if (author === currentAuthor) {
                    this.setState({
                        messages: this.state.messages.concat([{ text: `Hi, ${author}! Бот на связи!`, author: 'Bot', id: nanoid() }])
                    });
                }
            }, 5000);
        }
    }

    // componentDidUpdate()
    // {
    //     const {author} = this.state.messages[this.state.messages.length - 1];
    //     if(author !== 'Bot'){
    //         setTimeout(() => {
    //             this.setState({
    //                 messages: this.state.messages.concat([{text: `Hi, ${author}! Бот на связи!`, author: 'Bot', id: nanoid()}])
    //             });
    //         }, 2000);
    //     }
    // }


    render() {
        return (
            <div className="messenger">
                <MessageList items={this.state.messages} />
                <MessageForm onSend={this.handleMessageSend} />
            </div>
        );
    }
}
