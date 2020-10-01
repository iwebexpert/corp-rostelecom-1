import React, { Component } from 'react';
import { TextField, Fab, Typography } from '@material-ui/core';

import './ChatAddForm.css';

export class ChatAddForm extends Component {
    constructor(props) {
        super(props);
        // создадим ref в поле `textInput` для хранения DOM-элемента
        this.inputRef = React.createRef();
    }

    state = {
        newchat: '',
    }


    handleMessageSend = () => {
        const { newchat } = this.state;
        const { onSend } = this.props;

        if (typeof (onSend) === 'function') {
            onSend(newchat);
            this.setState({ newchat: '' });
        }
    }

    handleInputChange = (event) => {
        const fildName = event.target.name;

        this.setState({
            [fildName]: event.target.value,
        });
    }
    handleInputKey = (event) => {
        if (event.keyCode === 13) { //  Enter
            this.handleMessageSend()
        }
    };


    render() {
        const { newchat } = this.state;
        return (
            <div >
                <TextField label="Введите название чата" name="newchat" onKeyUp={this.handleInputKey} onChange={this.handleInputChange} />
                <Fab variant="extended" color="secondary" onClick={this.handleMessageSend}><Typography variant="button" className="logo">
                    Добавить
                        </Typography></Fab>
            </div>
        );
    }
}