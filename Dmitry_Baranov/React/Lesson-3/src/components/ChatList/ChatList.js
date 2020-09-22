import React, {Component} from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';

import './ChatList.css';


export class ChatList extends Component {
    render() {
        return (
            <div className="chatList">
                <List component="nav">
                    <ListItem button>
                        <ListItemText primary="Чат-1" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Чат-2" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Чат-3" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Чат-4" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Чат-5" />
                    </ListItem>
                </List>
            </div>
        );
    }
}