import React, { Component } from 'react';
import { Grid, Container } from '@material-ui/core';

import { Messenger } from 'components/Messenger';
import { Header } from 'components/Header';


import './Layout.css';

export class Layout extends Component {
    render() {
        return (
            <Container maxWidth="xl">
                <Grid item xs={12} className="header">
                    <Header />
                </Grid>
                <Grid item xs={12}>
                    <Messenger />
                </Grid>
            </Container>
        );
    }
}