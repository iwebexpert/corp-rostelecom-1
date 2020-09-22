import React, { Component } from 'react';
import { Grid, Container } from '@material-ui/core';

import { Messenger } from 'components/Messenger';
import { ChatList } from 'components/ChatList';

import './Layout.css';

export class Layout extends Component {
    render() {
        return (
            <Container maxWidth="xl" >
                <Grid item xs={12} className="logo">
                    The messenger
                </Grid>
                
                <Grid container item xs={12}>
                    <Grid item xs={3} >
                        <ChatList />
                    </Grid>

                    <Grid item xs={9}>
                        <Messenger />
                    </Grid>
                </Grid>
            </Container>

        );
    }
}