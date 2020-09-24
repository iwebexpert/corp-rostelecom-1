import React, { Component } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { MessageList } from 'components/MessageList';
import { MessageForm } from 'components/MessageForm';

import './Messenger.css';

export class Messenger extends Component {


    handleMessageSend = (message) => {
        const { onAdd } = this.props;
        if (typeof (onAdd) === 'function') {
            onAdd(this.props.match.params.id, message);
        }
    }

    componentDidMount() {
        console.log('messenger mount')
    }

    componentDidUpdate() {
        if (this.messages.length > 0) {
            if (['ReactBot'].indexOf(this.messages[this.messages.length - 1].author, 0) == -1) {
                setTimeout(() => {
                    if (['ReactBot'].indexOf(this.messages[this.messages.length - 1].author, 0) == -1) {
                        this.handleMessageSend({
                            text: `${this.messages[this.messages.length - 1].author} не приставай ко мне, я робот!`,
                            author: 'ReactBot',
                        })
                    }
                },
                    1000);
            }
        }
    }

    get messages() {
        const { chats } = this.props;
        const { match } = this.props;

        let messages = null;
        if (match && chats[match.params.id]) {
            messages = chats[match.params.id].messages;
        }
        return messages;
    }


    render() {
        console.log('messenger render')
        console.log(this.props.chats)
        const { chats } = this.props;
        const { id } = this.props.match.params;

        return (
            <div >
                { id < chats.length &&
                    <div className="messenger">
                        <AppBar position="static" >
                            <Toolbar>
                                <Typography variant="h6" className="logo">
                                    {chats[this.props.match.params.id].title}
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <MessageList items={this.messages} />
                        <MessageForm onSend={this.handleMessageSend} />
                    </div>
                }
            </div>

        );
    }
}