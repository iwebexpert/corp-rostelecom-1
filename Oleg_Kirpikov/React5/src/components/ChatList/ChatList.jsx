import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { List, ListItem, ListItemText, AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';

import { ChatAddForm } from 'components/ChatAddForm';

import './ChatList.css';

export class ChatList extends Component {
    state = {
        inputMode: false,
    }

    handleClick = (event) => {
        this.setState({ inputMode: true })
    }


    handleChatAddSend = (newChatTitle) => {
        const { handleChatAdd } = this.props;
        if (typeof (handleChatAdd) === 'function') {
            handleChatAdd(newChatTitle);
        }
        this.setState({ inputMode: false })
    }

    render() {
        const items = (typeof this.props.chats != 'undefined') ?
            this.props.chats.map((item, index) => (
                <ListItem key={item.id} component={Link} to={`/chats/${item.id}`}>
                    <ListItemText primary={item.title} />
                </ListItem >
            ))
            : <div></div>
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu" aria-haspopup="true" onClick={this.handleClick}>
                            <AddIcon />
                        </IconButton>
                        <Typography variant="h6" className="logo">
                            Список чатов
                        </Typography>
                    </Toolbar>
                </AppBar>

                <List className="chatlist" component="nav">
                    {items}
                    {
                        this.state.inputMode ? <ChatAddForm onSend={this.handleChatAddSend} /> : <div></div>
                    }
                </List>
            </div>
        );
    }
}