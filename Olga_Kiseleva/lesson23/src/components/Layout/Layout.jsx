import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { Button, Grid, Container, List, ListItem, ListItemText } from '@material-ui/core';

import { Messenger } from 'components/Messenger';
import { ChatForm } from 'components/Chat';
import { ChatList } from 'components/ChatList';
import { ProfilePage } from 'pages/Profile';
import { ProfileName } from 'components/ProfileName';

import { HomePage } from 'pages/Home';
import { AboutPage } from 'pages/About';
import { ContactsPage } from 'pages/Contacts';
import { NotFoundPage } from 'pages/PageNotFound';

import { chats } from '../../helpers/chatsData';

import { routes } from '../../routes';
import './Layout.css';

export class Layout extends Component {

    //TODO
    state = {
        chats: chats//
    };


    handleTestSend = () => {
        console.log('test', this.state)
        this.setState({
            chats: chats

        });

    };



    render() {
        return (
            <Container maxWidth="xl">
                <Grid item xs={12} className="logo">
                    The messenger
                </Grid>
                <div className="profile">

                    <Link to="/profile">Профиль</Link>
                    <Route path="/profile" exact>
                        <ProfilePage />
                    </Route>
                </div>
                
                <Grid item xs={3}>
                    <ChatList items={this.state} />
                    {/* <List>
                        {chats.map((item) => (<ListItem key={item.id}>
                            <Link to={`/chats/${item.id}`}>
                                <ListItemText primary={item.title} />
                            </Link>
                        </ListItem>))}
                    </List> */}
                    <ChatForm onSend={this.handleTestSend} />

                    <hr />
                    <div>
                        <Link to="/">Главная</Link>
                    </div>
                    <div>
                        <Link to="/about">О нас</Link>
                    </div>
                    <div>
                        <Link to="/contacts">Контакты</Link>
                    </div>
                    <div>
                        <Link to="/contacts1234">Page not found</Link>
                    </div>
                </Grid>
                <Grid item xs={9}>
                    <div>
                        <Switch>
                            {/* <Route path="/" exact>
                                <HomePage />
                            </Route>
                            <Route path="/about" exact>
                                <AboutPage />
                            </Route>
                            <Route path="/contacts" component={ContactsPage} exact />
                            <Route path="/chats/:id" component={Messenger} />
                            <Route path="*" component={NotFoundPage} /> */}
                            {routes.map((route, index) => (<Route key={index} {...route} />))}
                        </Switch>
                    </div>
                </Grid>
            </Container>
        );
    }
}
