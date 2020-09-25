import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { Grid, Container, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';

import { Messenger } from 'components/Messenger';

import { HomePage } from 'pages/Home';
import { AboutPage } from 'pages/About';
import { ContactsPage } from 'pages/Contacts';
import { NotFoundPage } from 'pages/PageNotFound';
import { ProfilePage } from 'pages/Profile';
import { Header } from 'components/Header';
import ArtTrack from '@material-ui/icons/ArtTrack';

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
            <Grid container xs={12}>
                <Grid item xs={12} className="logo">
                    <Header />
                </Grid>
                <Grid item xs={2}>
                    <List component="nav">
                        {chats.map((item) => (<ListItem key={item.id} button>
                            <Link to={`/chats/${item.id}`} style={{ textDecoration: "none" }} >
                                <ListItemIcon>
                                    <ArtTrack />{' '}
                                    <ListItemText primary={item.title} style={{ marginLeft: 20 }} />
                                </ListItemIcon>
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
            </Grid>   // Grid container
        );
    }
}