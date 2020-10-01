import React, { Component } from 'react';
import { Grid, Container } from '@material-ui/core';
import { Link, Switch, Route } from 'react-router-dom';
import { HeaderContainer as Header } from 'containers/HeaderContainer';
import { ProfileContainer as Profile } from 'containers/ProfileContainer';
import { NotFoundPage } from 'pages/PageNotFound';
//import { Chats } from 'components/Chats';
import { ChatsContainer as Chats } from 'containers/ChatsContainer';

//import { Messenger } from 'components/Messenger';
import { MessengerContainer as Messenger } from 'containers/MessengerContainer';

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
