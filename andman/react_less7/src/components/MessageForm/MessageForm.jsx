import React, { Component } from 'react';
import { Button, TextField, Fab } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

import './MessageForm.css';



export class MessageForm extends Component {
    state = {
        text: '',
        author: 'WebDev',
    }

    handleMessageSend = () => {
        const { text, author } = this.state;
        const { onSend, chat } = this.props;

        if (text && author) {
            if (typeof (onSend) === 'function') {
                // this.setState({ chat: chat });
                onSend({ text, author, chat });
                this.setState({ text: '', author: author });
            }
        } else {
            alert('Заполните все поля формы.')
        }
    }

    handleInputChange = (event) => {
        const fildName = event.target.name;

        this.setState({
            [fildName]: event.target.value,
        });
    }
    handleMessagePressKey = (event) => {
        if (event.keyCode == 13 && event.ctrlKey) {
            this.handleMessageSend();
        }
    }

    render() {
        const { text, author } = this.state;
        return (
            <div className="input-list">
                <TextField label="Введите автора" name="author" value={author} onChange={this.handleInputChange} />
                <TextField
                    label="Введите сообщение"
                    name="text"
                    value={text}
                    onChange={this.handleInputChange}
                    onKeyUp={this.handleMessagePressKey}
                    multiline
                    autoFocus
                />
                <Fab variant="extended" size="medium" color="primary" onClick={this.handleMessageSend} >Отправить сообщение<SendIcon /></Fab>
            </div >
        );
    }
}