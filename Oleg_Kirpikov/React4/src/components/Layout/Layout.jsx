import React, { Component } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';

import { Header } from 'components/Header';
import { Messenger } from 'components/Messenger';
import { ChatList } from 'components/ChatList';
import { Profile } from 'components/Profile';


import { chats } from '../../helpers/chatsData';

import './Layout.css';
import { nanoid } from 'nanoid';

var chatsData = chats;

export class Layout extends Component {
    //TODO
    state = {
        chats: chatsData,
    };
    componentDidMount() {
        console.log('lay mount')
        console.log(this.state.chats)
    }
    chatAddHandler = (newchat) => {
        console.log(newchat);
        const chat = {
            id: chatsData.length,
            title: newchat,
            messages: [],
        }


        console.log([...chatsData, chat])
        chatsData = [...chatsData, chat]
        this.setState({
            chats: chatsData,
        })
    };

    messageAddHandler = (id, message) => {
        message.id = nanoid();

        chatsData[id].messages = chatsData[id].messages ? chatsData[id].messages.concat([message]) : [message];

        this.setState({
            chats: chatsData,
        });

    };

    render() {
        return (
            <Grid container direction="row" spacing={1} className="layout">
                <Grid item xs={12}>
                    <Header />
                </Grid>
                <Grid item xs={3}>
                    <ChatList chats={this.state.chats} onAdd={this.chatAddHandler} />
                </Grid>
                <Grid item xs>
                    <div>
                        <Switch>
                            <Route path="/" exact>
                                <Typography variant="h4" >
                                    Выберите чат из списка слева
                                </Typography>
                            </Route>
                            <Route path="/profile" exact component={Profile} />
                            <Route path="/chats/:id" exact
                                render={(props) => (
                                    <Messenger {...props} chats={this.state.chats} onAdd={this.messageAddHandler} />
                                )}
                            />
                        </Switch>
                    </div>
                </Grid>
            </Grid>
        );
    }
}