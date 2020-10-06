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

class ProfileFormClass extends Component {
    state = {
        name: '',
        age: '',
        from: '',
    }

    handleUserSend = () => {
        const { name, age, from } = this.state;
        const { onSend } = this.props;

        if (name && age && from) {
            if (typeof (onSend) === 'function') {
                onSend(this.state);
                this.setState({ name: '' });
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
        const { name, age, from } = this.state;
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <TextField label="Ваше имя" name="name" value={name} onChange={this.handleInputChange} />
                <TextField
                    label="Ваш возраст"
                    name="age"
                    value={age}
                    onChange={this.handleInputChange}
                    autoFocus
                />
                <TextField
                    label="Ваш город"
                    name="from"
                    value={from}
                    onChange={this.handleInputChange}
                />
                <Fab variant="extended" color="primary" onClick={this.handleUserSend} className={classes.btn}><SendIcon /></Fab>
            </div>
        );
    }
}

export const ProfileForm = withStyles(styles)(ProfileFormClass);