import React, { Component } from 'react';
import { Grid, Container } from '@material-ui/core';

import { Messenger } from 'components/Messenger';

import './Layout.css';
import { Header } from 'components/Header';
import { ChatList } from 'components/ChatList';

export class Layout extends Component {
    render() {
        return (
            <Container maxWidth="xl">
                <Grid item xs={12}>
                    <Header />
                </Grid>
                <Grid item xs={12} className="fl">
                    <ChatList />
                    <Messenger />
                </Grid>
                {/* <Grid item xs={12}>
                    
                </Grid> */}
            </Container>
        );
    }
}