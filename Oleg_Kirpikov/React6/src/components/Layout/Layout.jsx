import React, { Component } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';

import { HeaderContainer } from 'containers/HeaderContainer';

import { ChatListContainer } from 'containers/ChatListContainer';
import { MessengerContainer } from 'containers/MessengerContainer';
import { ProfileContainer } from 'containers/ProfileContainer';


import './Layout.css';



export class Layout extends Component {

    render() {
        return (
            <Grid container direction="row" spacing={1} className="layout">
                <Grid item xs={12}>
                    <HeaderContainer />
                </Grid>
                <Grid item xs={3}>
                    <ChatListContainer {...this.props} />
                </Grid>
                <Grid item xs>
                    <div>
                        <Switch>
                            <Route path="/" exact>
                                <Typography variant="h4" >
                                    Выберите чат из списка слева
                                </Typography>
                            </Route>
                            <Route path="/profile" exact >
                                <ProfileContainer {...this.props} />
                            </Route>
                            <Route path="/chats/:id" exact
                                render={(props) => (
                                    <MessengerContainer {...props} />
                                )}
                            />
                        </Switch>
                    </div>
                </Grid>
            </Grid>
        );
    }
}