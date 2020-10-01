import React, { Component } from 'react';
import { Button, TextField, Fab } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

import './MessageForm.css';

export class MessageForm extends Component {
    state = {
        text: '',
        author: '',
        my: true,
        isError: false,
        txtEror: '',
    }

    handleMessageSend = () => {
        const { text, author, my } = this.state;
        const { onSend } = this.props;

        if (text && author && author.trim().length > 0 && text.trim().length > 0) {

            this.setState({
                my: true,
                isError: false,
                txtEror: ''
            });

            if (typeof (onSend) === 'function') {
                onSend(this.state);
                this.setState({ text: '' });
            }
        } else {
            //alert('Заполните все поля формы.')
            this.setState({
                isError: true,
                txtEror: 'Заполните все поля формы'
            });
        }
    }

    handleMessageSendKey = (event) => {
        if (event.keyCode == 13 && event.ctrlKey)
            this.handleMessageSend();
    }

    handleInputChange = (event) => {
        const fildName = event.target.name;

        this.setState({
            my: true,
            [fildName]: event.target.value,
        });
    }

    render() {
        const { text, author, my } = this.state;
        const { isError } = this.state;
        const divError = isError ? <p>Ошибка: {this.state.txtEror}</p> : "";
        return (
            <div className="messageform">
                <div>
                    <TextField label="Введите автора" name="author" value={author} onChange={this.handleInputChange} />
                </div>
                <div>
                    <TextField
                        label="Введите текст сообщения"
                        name="text"
                        value={text}
                        onChange={this.handleInputChange}
                        onKeyUp={this.handleMessageSendKey}
                        multiline
                        autoFocus
                        rows="4"
                        style={{ width: 500 }}
                    />
                </div>
                <Button variant="contained" color="primary" style={{ marginTop: 10 }} onClick={this.handleMessageSend} >Отправить сообщение<SendIcon style={{ marginLeft: 10 }} /></Button>
                {divError}
            </div>
        );
    }
}