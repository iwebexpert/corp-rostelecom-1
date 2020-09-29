import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { Grid, Container, List, ListItem, ListItemText } from '@material-ui/core';

import { Messenger } from 'components/Messenger';
import { Header } from 'components/Header';

import { HomePage } from 'pages/Home';
import { AboutPage } from 'pages/About';
import { ContactsPage } from 'pages/Contacts';
import { NotFoundPage } from 'pages/PageNotFound';

import { chats } from '../../helpers/chatsData';
import { routes } from '../../routes';
import './Layout.css';

export class Layout extends Component {

    //TODO
    // state = {
    //     chats: //
    // };

    // chatAddHandler = (chat) => {

    // };
    // messageAddHandler = (message) => {

    // };

    render() {
        return (
            <Container maxWidth="xl">
                <Grid item xs={12}>
                    <Header />
                </Grid>
                <Grid item xs={2}>
                    <List>
                        {chats.map((item) => (<ListItem key={item.id}>
                            <Link to={`/chats/${item.id}`}>
                                <ListItemText primary={item.title} />
                            </Link>
                        </ListItem>))}
                    </List>
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
                <Grid item xs={10}>
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