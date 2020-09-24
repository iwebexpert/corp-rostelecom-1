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
            <Container maxWidth="xl" >
                <Grid item xs={12}>
                    <Header />
                </Grid>
                <Grid container direction="row" spacing={0} className="layout">
                    <Grid item xs={3}>
                        <List>
                            {chats.map((item) => (<ListItem key={item.id}>
                                <Link to={`/chats/${item.id}`}>
                                    <ListItemText primary={item.title} />
                                </Link>
                            </ListItem>))}
                        </List>

                    </Grid>
                    <Grid item xs={9}>
                        <div>
                            <Switch>

                                {routes.map((route, index) => (<Route key={index} {...route} />))}
                            </Switch>
                        </div>
                    </Grid>
                </Grid>

            </Container>
        );
    }
}