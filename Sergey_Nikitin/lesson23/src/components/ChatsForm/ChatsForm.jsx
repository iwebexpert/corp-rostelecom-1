import React, { Component } from 'react';
import { Button, TextField, Fab } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { nanoid } from 'nanoid';

export class ChatsForm extends Component {
    state = {
        title: '',
    }

    handleAddChatSend = () => {
        const { title } = this.state;
        const { onSend } = this.props;

        if (title) {
            if (typeof (onSend) === 'function') {
                onSend(this.state);
                this.setState({ title: '' });
            }
        } else {
            alert('Заполните все поля формы.')
        }
    }
    handleKeyPress = (event) => {
        //console.log(event.ctrlKey);
        // console.log(event.key);
        if (event.ctrlKey && event.key === "Enter") {

            this.handleAddChatSend();
        }
    }

    handleInputChange = (event) => {
        const fildName = event.target.name;
        //console.log(fildName, event.target.value);

        this.setState({
            [fildName]: event.target.value,
        });
    }

    render() {
        const { title } = this.state;
        return (
            <div>
                <TextField label="Введите название" name="title" onChange={this.handleInputChange} />
                <Fab variant="extended" color="secondary" onClick={this.handleAddChatSend} ><SendIcon /></Fab>
            </div>
        );
    }
}