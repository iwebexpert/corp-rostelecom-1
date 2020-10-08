import React, {Component} from 'react';
import {Grid, Container} from '@material-ui/core';

import {MessengerContainer as  Messenger} from 'containers/MessengerContainer';
import {Header} from 'components/Header';
import {ProfileContainer as Profile} from 'containers/ProfileContainer';
import {Switch, Route} from 'react-router-dom'


import './Layout.css';
import {ChatListContainer as ChatList} from "containers/ChatListContainer";

export class Layout extends Component {
    render(){
        return (
            <Grid container >
                <Grid item xs={12} className="logo">
                    <Header />
                </Grid>
                    <Grid container item xs={12} alignItems={"stretch"} >
                        <Grid item xs={2}>
                            <ChatList />
                        </Grid>
                        <Grid item xs={10} >
                            <div>
                                <Switch>
                                    <Route exact path="/profile"><Profile /></Route>
                                    <Route exact path='/chats/:chatId' component={Messenger} />
                                </Switch>
                            </div>
                        </Grid>
                    </Grid>
             </Grid>
        );
    }
}