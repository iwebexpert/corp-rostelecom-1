import React, { Component } from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ChatIcon from '@material-ui/icons/Chat';

import { ChatForm } from 'components/ChatForm';

import './ChatList.css';

export class ChatList extends Component {
    render() {
        const { chats, handleChatAdd } = this.props;

        return (
            <div className="chat-list" >
                <ChatForm onSend={handleChatAdd} />
                <List >
                    {chats.map((item) => (<ListItem key={item.id}><ChatIcon color="primary" />
                        <Link to={`/chats/${item.id}`} key={item.id}>
                            <ListItemText primary={item.title} key={item.id} />
                        </Link>
                    </ListItem>))}
                </List>
            </div>
        );
    }
}