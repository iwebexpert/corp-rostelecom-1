import React, { Component } from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { chats } from '../../helpers/chatsData';
import './ChatList.css';

export class ChatList extends Component {
    render() {
        return (
            <List className="chatlist">
                {chats.map((item) => (
                    <ListItem key={item.id}>
                        <Link to={`/chats/${item.id}`}>
                            <ListItemText primary={item.title} />
                        </Link>
                    </ListItem>))}
            </List>
        );
    }
}  