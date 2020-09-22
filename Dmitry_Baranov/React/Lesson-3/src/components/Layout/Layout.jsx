import React, {Component} from 'react';
import {Grid, Container} from '@material-ui/core';

import {Messenger} from 'components/Messenger';
import {Header} from "components/Header";
import {ChatList} from "components/ChatList";

import './Layout.css';


export class Layout extends Component {
    render() {
        return (
            <Container maxWidth="xl" className="layout">
                <Grid item xs={12}>
                    <Header/>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <ChatList/>
                    </Grid>
                    <Grid item xs={9}>
                        <Messenger/>
                    </Grid>
                </Grid>

            </Container>
        );
    }
}