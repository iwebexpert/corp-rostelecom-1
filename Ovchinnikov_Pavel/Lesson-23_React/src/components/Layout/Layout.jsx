import React, { Component } from 'react';
import { Grid, Container } from '@material-ui/core';

import { Link, Switch, Route } from 'react-router-dom';

import { Header } from 'components/Header';
import { Profile } from 'pages/Profile';
import { NotFoundPage } from 'pages/PageNotFound';
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

                    {/* <Switch>
                        <Route path="/chats" exact>
                            <Grid item xs={3}>
                                <Chats />
                            </Grid>
                            <Grid item xs={9}>
                                <Messenger />
                            </Grid>
                        </Route>

                        <Route path="/profile">
                            <Profile />
                        </Route>

                        <Route path="/chats/:id" component={Messenger} />

                        <Route path="*" component={NotFoundPage} />
                    </Switch> */}

                </Grid>
            </Container >
        );
    }
}
