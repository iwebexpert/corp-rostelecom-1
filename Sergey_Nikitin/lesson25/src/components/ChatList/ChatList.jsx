import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import classNames from 'classnames';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ChatIcon from '@material-ui/icons/Chat';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import { Link, Switch, Route } from 'react-router-dom';

import './ChatList.css';


export class ChatList extends Component {
    render() {
        const { chats } = this.props;
        return (
            <div>
                <List className='chatList'>
                    {chats.map((item) => (
                        <Link key={item.id} to={`/chats/${item.id}`}><ListItem key={item.id} >

                            <ListItemAvatar>
                                <Avatar>
                                    <ChatIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={item.title} /><div className={item.fire ? "blink" : ""}></div>
                        </ListItem></Link>
                    ))}
                </List>
                <hr />
                <div>
                    <Link to="/">Главная</Link>
                </div>
                <div>
                    <Link to="/about">О нас</Link>
                </div>
                <div>
                    <Link to="/contacts">Контакты</Link>
                </div>
                <div>
                    <Link to="/contacts1234">Page not found</Link>
                </div>
                <hr />
            </div>
        );
    }
}