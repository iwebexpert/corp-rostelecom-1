import React, { Component } from 'react';
import { Button, TextField, Fab, withStyles } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const styles = {
    root: {
        backgroundColor: 'rgb(209, 223, 236)',
        padding: 5,
        borderRadius: 10, //px
    },
    btn: {
        fontSize: '18px',
    }
};

class MessageFormClass extends Component {
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

    render() {
        const { text, author } = this.state;
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <TextField label="Ваше имя" name="author" value={author} onChange={this.handleInputChange} />
                <TextField
                    label="Ваш текст"
                    name="text"
                    value={text}
                    onChange={this.handleInputChange}
                    multiline
                    autoFocus
                />
                <Fab variant="extended" color="primary" onClick={this.handleMessageSend} className={classes.btn}><SendIcon /></Fab>
            </div>
        );
    }
}

export const MessageForm = withStyles(styles)(MessageFormClass);