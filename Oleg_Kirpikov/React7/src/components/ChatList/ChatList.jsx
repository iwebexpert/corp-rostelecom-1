import React, { Component } from 'react';

import { List, ListItem, ListItemText, AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { ChatAddForm } from 'components/ChatAddForm';
import CircularProgress from '@material-ui/core/CircularProgress';

import { nanoid } from 'nanoid';

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

    handleNavigate = (chatId) => {
        this.props.push('/chats/' + chatId)
    }

    render() {
        const { isLoading, isError, } = this.props;
        const items = (this.props.chats.entries.length > 0) ?
            this.props.chats.entries.map((item, index) => (
                <ListItem key={nanoid()}>
                    <ListItem key={item.id} button onClick={() => this.handleNavigate(`${item.id}`)}>
                        <ListItemText primary={item.title}
                            className={this.props.chats.blinkChatId == item.id ? "blink" : ""}
                        />
                    </ListItem >
                    <IconButton key={nanoid()} aria-label="delete" onClick={() => this.props.handleChatDelete(`${item.id}`)}>
                        <DeleteIcon />
                    </IconButton>
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
                { isLoading ?
                    <CircularProgress value={100} /> :
                    isError ?
                        <div>Не удалось загрузить чаты... <button onClick={this.props.handleReloadChats}>Загрузить повторно</button></div> :
                        <List className="chatlist" component="nav">
                            {items}
                            {
                                this.state.inputMode ? <ChatAddForm onSend={this.handleChatAddSend} /> : <div></div>
                            }
                        </List>
                }
            </div>
        );
    }
}