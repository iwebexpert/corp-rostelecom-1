import React, { Component } from 'react';
import { List, ListItem, ListItemText, Link } from '@material-ui/core';

import './ChatList.css';

export class ChatList extends Component {
    render() {
        return (
            <div className="chat-list" >
                <List >
                    {this.props.items.map((item) => (<ListItem key={item.id}>
                        <Link to={`/chats/${item.id}`}>
                            <ListItemText primary={item.title} />
                        </Link>
                    </ListItem>))}
                </List>
            </div>
        );
    }
}