import React, { Component } from 'react';
import { Button, TextField, Fab, withStyles } from '@material-ui/core';
// import { Button } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { nanoid } from 'nanoid';

import { chats } from '../../helpers/chatsData';
import { profile } from '../../helpers/profileData';

export class Profile extends Component {
    state = {
        // id: profile.length,
        author: '',
        // chats: []
    }

    handleAuthorSend = () => {
        const { id, author } = this.state;
        const { onSend } = this.props;
        console.log('handleAuthorSend this.state', author)
        profile.push(this.state)
        console.log('profile', profile)
        // console.log('profile', profile)
        if (author) {
            if (typeof (onSend) === 'function') {
                onSend(this.state);
                this.setState({
                    author: author,
                });


                // this.setState({ author: '' })
                // ;
                console.log('profile', profile)
            }
        } else {
            alert('Введите Ваше имя')
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
        const { author } = this.state;
        console.log('author profile', author)
        return (
            <div>
                <TextField label="Введите Ваше имя" name="author" value={author} onChange={this.handleInputChange} />
                <Button variant="contained" color="primary" onClick={this.handleAuthorSend}>Авторизоваться</Button>
            </div>
        );
    }
}

