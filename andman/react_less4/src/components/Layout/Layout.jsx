import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { Grid, Container, List, ListItem, ListItemText } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';

import { Messenger } from 'components/Messenger';

import { Header } from 'components/Header';
import { ChatForm } from 'components/ChatForm';

import { ProfilePage } from 'pages/Profile';
import { NotFoundPage } from 'pages/PageNotFound';

import { chats } from '../../helpers/chatsData';
import { nanoid } from 'nanoid';

import './Layout.css';

export class Layout extends Component {
    //TODO
    state = {
        chats,
        userPost: false,
        chatId: ''
    }

    chatAddHandler = (chat) => {
        const curChats = this.state.chats;
        curChats.push({ id: curChats.length, title: chat.title, messages: [] });
        this.setState({
            chats: [...curChats],
        });

    };
    messageAddHandler = (message) => {
        const { chats } = this.state;
        message.id = nanoid();
        chats[message.chat].messages = chats[message.chat].messages.concat([{ id: message.id, author: message.author, text: message.text }])

        this.setState({
            chats: [
                ...chats,
            ],
            userPost: true,
            chatId: message.chat
        });


    };

    componentDidUpdate() {

        document.getElementById('flag').scrollIntoView();

        if (this.state.userPost) {
            setTimeout(() => {
                const messages = this.state.chats[this.state.chatId].messages;
                const { author } = messages[messages.length - 1];
                if (author != 'Bot') {
                    this.setState({
                        userPost: false,
                    });
                    this.messageAddHandler({ text: `Hi, ${author}! Бот на связи!`, author: 'Bot', chat: this.state.chatId })
                }
            }, 2000);
        }
    }





    render() {
        return (
            <Container maxWidth="xl">
                <Grid item xs={12} className="header">
                    <Header />
                </Grid>
                <Grid item xs={12} >
                    <div className="container">
                        <div className="chat-list" >
                            <List >
                                {this.state.chats.map((item) => (<ListItem key={item.id}><ChatIcon color="primary" />
                                    <Link to={`/chats/${item.id}`} key={item.id}>
                                        <ListItemText primary={item.title} key={item.id} />
                                    </Link>
                                </ListItem>))}
                            </List>
                            <ChatForm onSend={this.chatAddHandler} />
                        </div>
                        <Switch>
                            <Route path="/profile" component={ProfilePage} exact />
                            <Route path="/chats/:id" component={props => <Messenger {...props} state={this.state} addMsgHandler={this.messageAddHandler} />} exact />
                            <Route path="*" component={NotFoundPage} />
                        </Switch>
                    </div>
                </Grid>
            </Container >
        );
    }
}