import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { Grid, Container, List, ListItem, ListItemText } from '@material-ui/core';
import { nanoid } from 'nanoid';

import { Messenger } from 'components/Messenger';
import { Header } from 'components/Header';


import './Layout.css';
import { chats } from '../../helpers/chatsData';
import { routes } from '../../routes';
import { HomePage } from 'pages/Home';
import { AboutPage } from 'pages/About';
import { ContactsPage } from 'pages/Contacts';
import { NotFoundPage } from 'pages/PageNotFound';
import { ChatList } from 'components/ChatList';
import { ChatsForm } from 'components/ChatsForm';
import { Profile } from 'components/Profile';


export class Layout extends Component {
    //TODO
    state = {
        chates: chats,
    };

    chatAddHandler = (chat) => {
        const { chates } = this.state;
        chat.id = chates.length;
        chat.messages = [
            {
                id: 0,
                author: "Ghost",
                text: "Рыба!"
            }
        ];
        let chats = chates.concat(chat);

        this.setState({ chates: chats });
    };
    // messageAddHandler = (message) => {

    // };
    render() {
        console.log(this.state.chates);
        return (
            <Container maxWidth="xl" >
                <Grid item xs={12} >
                    <Header text="Messanger" />
                </Grid>
                <Grid container direction="row">
                    <Grid item>
                        <div>
                            <ChatList chats={this.state.chates} />
                            <ChatsForm onSend={this.chatAddHandler}></ChatsForm>
                        </div>
                    </Grid>
                    <Grid item xs={9}>
                        <div>
                            <Switch>
                                <Route path="/chats/:id" render={(props) => <Messenger  {...props} chats={this.state.chates} />} />
                                {routes.map((route, index) => (<Route key={index} {...route} />))}
                            </Switch>
                        </div>
                    </Grid>
                </Grid>


            </Container>
        );
    }
}