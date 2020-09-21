import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

import { Header } from 'components/Header';
import { Messenger } from 'components/Messenger';
import { ChatList } from 'components/ChatList';

import './Layout.css';


export class Layout extends Component {
    render() {
        return (
            <Grid container direction="row" spacing={1} className="layout">
                <Header />
                <Grid item xs={3}>
                    <ChatList />
                </Grid>
                <Grid item xs>
                    <Messenger />
                </Grid>
            </Grid>
        );
    }
}