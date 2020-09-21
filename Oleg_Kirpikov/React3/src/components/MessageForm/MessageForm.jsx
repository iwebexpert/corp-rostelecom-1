import React, { Component } from 'react';
import { Button, TextField, Fab } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

import './MessageForm.css';

export class MessageForm extends Component {
    constructor(props) {
        super(props);
        // создадим ref в поле `textInput` для хранения DOM-элемента
        this.inputRef = React.createRef();
    }

    state = {
        text: '',
        author: '',
    }

    componentDidUpdate() {
        //автофокус на поле ввода сообщения
        const elementInput = this.inputRef.current;
        elementInput.focus();
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

        this.setState({
            [fildName]: event.target.value,
        });
    }
    handleInputKey = (event, message) => {
        if (event.keyCode === 13 && event.ctrlKey) { // Ctrl Enter
            this.handleMessageSend()
        }
    };


    render() {
        const { text, author } = this.state;
        return (
            <div >
                <TextField label="Введите автора" name="author" value={author} onChange={this.handleInputChange} className="inputform" />
                <TextField
                    label="Введите текст сообщения"
                    name="text"
                    value={text}
                    onChange={this.handleInputChange}
                    onKeyUp={this.handleInputKey}
                    inputRef={this.inputRef}
                    className="inputform"
                    multiline
                    autoFocus
                />
                <Fab variant="extended" color="secondary" onClick={this.handleMessageSend}><SendIcon /></Fab>
            </div>
        );
    }
}