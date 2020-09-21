import React, { Component } from 'react';
import './ChatList.css';
import { List, ListItem, ListItemText, ListItemIcon, ListSubheader } from '@material-ui/core';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';


export class ChatList extends Component {
    render() {
        return (
            <div className="chat-list">
                <List component="nav"
                    subheader={
                        <ListSubheader component="div" id="chats">
                            The Chats
                        </ListSubheader>
                    }
                >
                    <ListItem button>
                        <ListItemIcon>
                            <BeachAccessIcon />
                        </ListItemIcon>
                        <ListItemText primary="chat 1" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <BeachAccessIcon />
                        </ListItemIcon>
                        <ListItemText primary="chat 2" />
                    </ListItem>
                </List>
            </div>
        );
    }
}
