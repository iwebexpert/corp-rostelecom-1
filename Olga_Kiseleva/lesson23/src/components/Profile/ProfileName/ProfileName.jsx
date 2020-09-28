import React, { Component } from 'react';
import { Button, TextField, Fab, withStyles } from '@material-ui/core';
// import { Button } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { nanoid } from 'nanoid';

import { chats } from '../../helpers/chatsData';
import { profile } from '../../helpers/profileData';
import { Profile } from 'components/Profile';

export class ProfileName extends Component {
    state = {
        //     // id: profile.length,
        author: '',
        //     // chats: []
    }

     render() {
        console.log(this.props)
        const { author } = this.state;
        return (

            < div >
                {/* Профиль: */}
                Профиль: {author}
            </div >
        );
    }
}

