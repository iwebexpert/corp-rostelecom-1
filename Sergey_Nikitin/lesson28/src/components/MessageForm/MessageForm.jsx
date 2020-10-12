import React, { useState } from 'react';
import { TextField, Fab } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

export const MessageForm = (props) => {
    const [dataForm, setDataForm] = useState(
        {
            text: '',
            author: '',
        }
    );
    const styles = {
        someTextField: {
            minHeight: 420
        }
    };

    const handleMessageSend = () => {
        const { text, author } = dataForm;
        const { onSend } = props;

        if (text && author) {
            if (typeof (onSend) === 'function') {
                onSend(dataForm);
                setDataForm({ ...dataForm, text: '' });
            }
        } else {
            alert('Заполните все поля формы.')
        }
    }

    const handleInputChange = (event) => {
        setDataForm({
            ...dataForm,
            [event.target.name]: event.target.value,
        });
    }

    return (
        <div>
            <TextField label="Введите автора" name="author" value={dataForm.author} onChange={handleInputChange} />
            <TextField
                label="Введите текст сообщения"
                name="text"
                value={dataForm.text}
                onChange={handleInputChange}
                multiline
                autoFocus
            />
            <Fab variant="extended" color="secondary" onClick={handleMessageSend}><SendIcon /></Fab>
        </div>
    );
};


/*import React, { Component } from 'react';
import { Button, TextField, Fab } from '@material-ui/core';
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
    handleKeyPress = (event) => {
        //console.log(event.ctrlKey);
        // console.log(event.key);
        if (event.ctrlKey && event.key === "Enter") {

            this.handleMessageSend();
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
        const { text, author } = this.state;
        return (
            <div>
                <TextField label="Введите автора" name="author" value={author} onChange={this.handleInputChange} />
                <TextField
                    label="Введите текст сообщения"
                    name="text"
                    value={text}
                    onChange={this.handleInputChange}
                    multiline
                    autoFocus
                    onKeyDown={this.handleKeyPress}
                />
                <Fab variant="extended" color="secondary" onClick={this.handleMessageSend} ><SendIcon /></Fab>
            </div>
        );
    }
}*/