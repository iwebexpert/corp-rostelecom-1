import React, {Component} from 'react';
import {Grid, Container} from '@material-ui/core';

import {Messenger} from 'components/Messenger';

import './Layout.css';

export class Layout extends Component {
    render(){
        return (
            <Container maxWidth="xl">
                <Grid item xs={12} className="logo">
                    The messenger
                </Grid>
                <Grid item xs={12}>
                    <Messenger />
                </Grid>
            </Container>
        );
    }
}