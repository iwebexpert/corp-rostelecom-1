import React, { useState } from 'react';

import { List, ListItem, ListItemText, AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { ChatAddForm } from 'components/ChatAddForm';
import CircularProgress from '@material-ui/core/CircularProgress';

import { nanoid } from 'nanoid';

import './ChatList.css';

export const ChatList = (props) => {

    const [inputState, setInputState] = useState(
        {
            inputMode: false,
        }
    );

    const { isLoading, isError } = props;
    console.log('chats ', props.chats);
    const items = (props.chats) ?
        props.chats.entries.map((item, index) => (
            <ListItem key={nanoid()}>
                <ListItem key={item.id} button onClick={() => handleNavigate(`${item.id}`)}>
                    <ListItemText primary={item.title}
                        className={props.chats.blinkChatId == item.id ? "blink" : ""}
                    />
                </ListItem >
                <IconButton key={nanoid()} aria-label="delete" onClick={() => props.handleChatDelete(`${item.id}`)}>
                    <DeleteIcon />
                </IconButton>
            </ListItem >

        ))
        : <div></div>


    const handleClick = (event) => {
        setInputState({ inputMode: true })
    }

    const handleChatAddSend = (newChatTitle) => {
        const { handleChatAdd } = props;
        if (typeof (handleChatAdd) === 'function') {
            handleChatAdd(newChatTitle);
        }
        setInputState({ inputMode: false })
    }

    const handleNavigate = (chatId) => {
        props.push('/chats/' + chatId)
    }

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" aria-haspopup="true" onClick={handleClick}>
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
                    <div>Не удалось загрузить чаты... <button onClick={props.handleReloadChats}>Загрузить повторно</button></div> :
                    <List className="chatlist" component="nav">
                        {items}
                        {
                            inputState.inputMode ? <ChatAddForm onSend={handleChatAddSend} /> : <div></div>
                        }
                    </List>
            }
        </div>
    );
}