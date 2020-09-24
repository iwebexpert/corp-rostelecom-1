import React, { Component } from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { Link, Switch, Route } from 'react-router-dom';
//import Divider from '@material-ui/core/Divider';
import Person from '@material-ui/icons/Person';
import { chats } from '../../helpers/chatsData';

import './Chats.css';

export class Chats extends Component {
    render() {
        return (
            <div>
                <List component="nav" aria-label="main mailbox folders">
                    {chats.map((item) => (
                        <ListItem button key={item.id}>
                            <ListItemIcon>
                                <Person />
                            </ListItemIcon>
                            <Link className="router_link" to={`/chats/${item.id}`}>
                                <ListItemText primary={item.title} />
                            </Link>
                        </ListItem>))}
                </List>

            </div >
        );
    }
}
