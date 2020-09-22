import React, { Component } from 'react';

import { List, ListItem, ListItemText } from '@material-ui/core';

import './ChatList.css';

// function ListItemLink(props) {
//     return <ListItem button component="a" {...props} />;
// }

export class ChatList extends Component {
    render() {
        return (
            <div className="chatList">
                <List className="chat" component="nav" aria-label="secondary mailbox folders">
                    <ListItem button>
                        <ListItemText primary="Chat-1" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Chat-2" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Chat-3" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Chat-4" />
                    </ListItem>
                    {/* <ListItemLink href="#">
                        <ListItemText primary="Spam" />
                    </ListItemLink> */}
                </List>
            </div>
        );
    }
}