import React, { Component } from 'react';
import { Grid, Container } from '@material-ui/core';

import { Header } from 'components/Header';
import { Chats } from 'components/Chats';
import { Messenger } from 'components/Messenger';

export class Layout extends Component {
    render() {
        return (
            <Container maxWidth="xl">
                <Grid item xs={12}>
                    <Header />
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Chats />
                    </Grid>
                    <Grid item xs={10}>
                        <Messenger />
                    </Grid>
                </Grid>
            </Container>
        );
    }
}
