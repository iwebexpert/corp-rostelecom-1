import React, { Component } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { MessageList } from 'components/MessageList';
import { MessageForm } from 'components/MessageForm';

import './Messenger.css';

export class Messenger extends Component {


    handleMessageSend = (message) => {
        const { onAdd } = this.props;
        if (typeof (onAdd) === 'function') {
            onAdd(message);
        }
    }

    componentDidMount() {
        console.log('messenger mount')
    }


    render() {
        const { id } = this.props.match.params;
        const { chatId, chatTitle, messages } = this.props;

        return (
            <div >
                { id <= chatId &&
                    <div className="messenger">
                        <AppBar position="static" >
                            <Toolbar>
                                <Typography variant="h6" className="logo">
                                    {chatTitle}
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <MessageList chatId={chatId} items={messages} handleMessageDelete={this.props.handleMessageDelete} />
                        <MessageForm onSend={this.handleMessageSend} />
                    </div>
                }
            </div>

        );
    }
}