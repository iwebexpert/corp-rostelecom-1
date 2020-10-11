import React from 'react';

import { useParams } from 'react-router-dom';

import { AppBar, Toolbar, Typography } from '@material-ui/core';

import { MessageList } from 'components/MessageList';
import { MessageForm } from 'components/MessageForm';

import './Messenger.css';

export const Messenger = (props) => {

    const { id } = useParams();;

    const { chatId, chatTitle, messages, isLoading, isError, } = props;

    const handleMessageSend = (message) => {
        const { onAdd } = props;
        if (typeof (onAdd) === 'function') {
            onAdd(message);
        }
    }



    if (isLoading) {
        return (<div></div>);
    }

    if (isError) {
        return (<div>Error</div>);
    }

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
                    <MessageList chatId={chatId} items={messages} handleMessageDelete={props.handleMessageDelete} />
                    <MessageForm onSend={handleMessageSend} />
                </div>
            }
        </div>

    );
}