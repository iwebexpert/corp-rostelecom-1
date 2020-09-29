import React, { Component } from 'react';
import { Button, TextField, Fab, withStyles } from '@material-ui/core';
import { Link, Switch, Route } from 'react-router-dom';
// import { Button } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { nanoid } from 'nanoid';

import { chats } from '../../helpers/chatsData';
import { profile } from '../../helpers/profileData';
import { ProfilePage } from 'pages/Profile';
import { Profile } from 'components/Profile';

export class ChatForm extends Component {
    state = {
        author: '',
        id: chats.length,
        // id: nanoid(10),
        title: '',
        messages: []
    }

   

    handleChatsSend = () => {
        const { id, title } = this.state;
        const { onSend } = this.props;
        console.log(this.state)
        if (title) {
            if (typeof (onSend) === 'function') {
                onSend(this.state);

                this.setState({
                    title: title,
                    id: chats.length,
                    // id: nanoid(10),
                });
                chats.push(this.state)
                this.setState({ title: '' });
            }
        } else {
            alert('Заполните все поля формы.')
        }
    }

    handleInputChange = (event) => {
        const fildName = event.target.name;
        //console.log(fildName, event.target.value);

        this.setState({
            author: profile[profile.length - 1],
            [fildName]: event.target.value,
        });
    }

    render() {
        const { author } = this.state;
        const { title } = this.state;
        return (
            <div>
                <TextField label="Введите название чата" name="title" value={title} onChange={this.handleInputChange} />
                <Button variant="contained" color="primary" onClick={this.handleChatsSend}>Add chat</Button>
              
            </div >
        );
    }
}

