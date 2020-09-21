import React, { Component } from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';

import './ChatList.css';

export class ChatList extends Component {
    render() {
        return (
            <div className="chat-list">
                <List >
                    <ListItem button>
                        <ListItemText primary="Chat One" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Chat Two" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Chat Three" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Chat Four" />
                    </ListItem>
                </List>
            </div>
        );
    }
}