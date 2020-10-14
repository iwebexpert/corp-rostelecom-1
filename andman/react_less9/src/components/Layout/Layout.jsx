import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Grid, Container } from '@material-ui/core';


import { MessengerContainer as Messenger } from 'containers/MessengerContainer';
import { HeaderContainer as Header } from 'containers/HeaderContainer';
import { ChatListContainer as ChatList } from 'containers/ChatsContainer';
import { ProfileContainer as ProfilePage } from 'containers/ProfileContainer';

import { NotFoundPage } from 'pages/PageNotFound';
import { IndexPage } from 'pages/PageIndex';

import './Layout.css';

export class Layout extends Component {


    render() {
        return (
            <Container maxWidth="xl">
                <Grid item xs={12} className="header">
                    <Header />
                </Grid>
                <Grid item xs={12} >
                    <div className="container">
                        <ChatList />
                        <Switch>
                            <Route path="/profile" component={ProfilePage} exact />
                            {/* <Route path="/chats/:id" component={props => <Messenger {...props} state={this.state} addMsgHandler={this.messageAddHandler} />} exact /> */}
                            <Route path="/chats/:id" component={Messenger} exact />
                            <Route path="/" component={ProfilePage} exact />
                            <Route path="*" component={NotFoundPage} />
                        </Switch>
                    </div>
                </Grid>
            </Container >
        );
    }
}