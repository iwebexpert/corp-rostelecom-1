import React, { Component } from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
//import Divider from '@material-ui/core/Divider';
import Person from '@material-ui/icons/Person';

//import './Chats.css';

export class Chats extends Component {

    render() {
        return (
            <div>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem button>
                        <ListItemIcon>
                            <Person />
                        </ListItemIcon>
                        <ListItemText primary="Chat-1" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <Person />
                        </ListItemIcon>
                        <ListItemText primary="Chat-2" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <Person />
                        </ListItemIcon>
                        <ListItemText primary="Chat-3" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <Person />
                        </ListItemIcon>
                        <ListItemText primary="Chat-4" />
                    </ListItem>
                </List>

            </div>
        );
    }
}
