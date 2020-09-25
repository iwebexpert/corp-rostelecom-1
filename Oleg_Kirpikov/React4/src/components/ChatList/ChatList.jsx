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

    handleChatAdd = (newchat) => {
        const { onAdd } = this.props;
        if (newchat) {
            if (typeof (onAdd) === 'function') {
                onAdd(newchat);
            }
        }
        this.setState({ inputMode: false })
    }

    render() {
        console.log('list render')
        console.log(this.props.chats)
        const items = this.props.chats.map((item, index) => (
            <ListItem key={item.id} component={Link} to={`/chats/${item.id}`}>
                <ListItemText primary={item.title} />
            </ListItem >
        ));

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
                        this.state.inputMode ? <ChatAddForm onSend={this.handleChatAdd} /> : <div></div>
                    }
                </List>
            </div>
        );
    }
}