import React, { Component } from 'react';
import classNames from 'classnames';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ChatIcon from '@material-ui/icons/Chat';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

import './ChatList.css';

export class ChatList extends Component {
    render() {
        return (
            <List className="chatList">
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <ChatIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Личный чат" secondary="Jan 9, 2014" />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <WorkIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Рабочий чат" secondary="Jan 7, 2014" />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <BeachAccessIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Болталка" secondary="July 20, 2014" />
                </ListItem>
            </List>
        );
    }
}