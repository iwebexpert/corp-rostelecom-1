import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

import { ChatList } from 'components/ChatList';
import { Messenger } from 'components/Messenger';
import { Header } from 'components/Header';

import './Layout.css';

export class Layout extends Component {
    render() {
        return (
            <Grid container xs={12}>
                <Header />
                <Grid item xs={3} sm={3} md={3} lg={2} xl={1}>
                    <ChatList />
                </Grid>
                <Grid item xs={9} sm={9} md={9} lg={10} xl={11}>
                    <Messenger />
                </Grid>
            </Grid>
        );
    }
}