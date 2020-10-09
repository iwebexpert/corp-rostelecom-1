import React, { Component } from 'react';
import { Grid, Container } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import { HeaderContainer as Header } from 'containers/HeaderContainer';
import { ProfileContainer as Profile } from 'containers/ProfileContainer';
import { NotFoundPage } from 'pages/PageNotFound';
import { ChatsContainer as Chats } from 'containers/ChatsContainer';

import { MessengerContainer as Messenger } from 'containers/MessengerContainer';

export const Layout = () => {
    return (
        <Container maxWidth="xl">
            <Grid item xs={12}>
                <Header />
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Chats />
                </Grid>

                <Grid item xs={9}>
                    <Switch>
                        <Route path="/chats" component={Messenger} exact />
                        <Route path="/profile">
                            <Profile />
                        </Route>
                        <Route path="/chats/:id" component={Messenger} />
                        <Route path="*" component={NotFoundPage} />
                    </Switch>
                </Grid>
            </Grid>
        </Container >
    );
}