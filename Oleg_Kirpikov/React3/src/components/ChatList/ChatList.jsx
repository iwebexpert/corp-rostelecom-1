import React, { Component } from 'react';
import { List, ListItem, ListItemText, Container } from '@material-ui/core';
import { nanoid } from 'nanoid';
import './ChatList.css';

export class ChatList extends Component {
    state = {
        chats: [
            {
                text: 'Чат 1',
                id: nanoid(),
            },
            {
                text: 'Чат 2',
                id: nanoid(),
            },
            {
                text: 'Чат 3',
                id: nanoid(),
            },
        ],
    }

    render() {
        const items = this.state.chats.map((item, index) => (
            <ListItem key={item.id} button>
                <ListItemText primary={item.text} />
            </ListItem>
        ));

        return (
            <div>
                <List className="chatlistheader">
                    Список чатов
                </List>
                <List className="chatlist" component="nav">
                    {items}
                </List>
            </div>
        );
    }
}