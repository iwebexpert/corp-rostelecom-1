import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

export class MessageForm extends Component {
    state = {
        text: '',
        author: '',
    }

    handleMessageSend = () => {
        const { text, author } = this.state;
        const { onSend } = this.props;

        if (text && author) {
            if (typeof (onSend) === 'function') {
                onSend(this.state);
                this.setState({ text: '' });
            }
        } else {
            alert('Заполните все поля формы.')
        }
    }

    handleInputChange = (event) => {
        const fildName = event.target.name;
        //console.log(fildName, event.target.value);

        this.setState({
            [fildName]: event.target.value,
        });
    }

    handleKeyPress = (event) => {
        if (event.keyCode == 13 && event.ctrlKey)
            this.handleMessageSend();
    }

    render() {
        const { text, author } = this.state;
        return (
            <div>
                <TextField label="Введите автора" name="author" variant="outlined" value={author} onChange={this.handleInputChange} style={{ margin: 10 }} />{" "}
                <TextField
                    label="Введите текст сообщения"
                    name="text"
                    value={text}
                    onChange={this.handleInputChange}
                    onKeyUp={this.handleKeyPress}
                    multiline
                    autoFocus
                    variant="outlined"
                    style={{ margin: 10, width: 300 }}
                />{" "}
                <Button
                    variant="contained"
                    color="primary"
                    style={{ margin: 10, marginTop: 18 }}
                    onClick={this.handleMessageSend}>
                    Отправить<SendIcon style={{ marginLeft: 15 }} />
                </Button>
            </div>
        );
    }
}