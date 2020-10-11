import React, { useState } from 'react';
import { TextField, Fab, Typography } from '@material-ui/core';

import './ChatAddForm.css';

export const ChatAddForm = (props) => {

    const inputRef = React.createRef();

    const [newChatState, setNewChatState] = useState(
        {
            newchat: '',
        }
    );


    const handleMessageSend = () => {
        const { newchat } = newChatState;
        const { onSend } = props;

        if (typeof (onSend) === 'function') {

            onSend(newchat);
            setNewChatState({ newchat: '' });
        }
    }

    const handleInputChange = (event) => {
        const fildName = event.target.name;
        setNewChatState({
            [event.target.name]: event.target.value,
        });
    }

    const handleInputKey = (event) => {
        if (event.keyCode === 13) { //  Enter
            handleMessageSend()
        }
    };


    const { newchat } = newChatState.newchat;

    return (
        <div >
            <TextField label="Введите название чата" name="newchat" onKeyUp={handleInputKey} onChange={handleInputChange} />
            <Fab variant="extended" color="secondary" onClick={handleMessageSend}><Typography variant="button" className="logo">
                Добавить
                        </Typography></Fab>
        </div>
    );
}