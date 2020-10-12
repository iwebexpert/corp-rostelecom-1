import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { Grid, Container, List, ListItem, ListItemText } from '@material-ui/core';
import { connect } from 'react-redux';

import { Messenger } from 'components/Messenger';
import { Header } from 'components/Header';

import { HomePage } from 'pages/Home';
import { AboutPage } from 'pages/About';
import { ContactsPage } from 'pages/Contacts';
import { NotFoundPage } from 'pages/PageNotFound';

import { chats as chatsData } from '../../helpers/chatsData';
import { ProfileContainer as Profile } from 'containers/ProfileContainer';
import { routes } from '../../routes';
import './Layout.css';

class LayoutClass extends Component {
    render() {
        let { chats } = this.props;
        if (!chats.length) {
            chats = chatsData;
        }

        return (
            <Container maxWidth="xl">
                <Grid item xs={12}>
                    <Header />
                </Grid>
                <Grid container direction="row" spacing={0} className="layout">
                    <Grid item xs={2}>
                        <List>
                            {chats.map((item) => (<ListItem key={item.id}>
                                <Link to={`/chats/${item.id}`} className={item.fire}>
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
                                <Route path="/profile">
                                    <Profile />
                                </Route>
                                {routes.map((route, index) => (<Route key={index} {...route} />))}
                            </Switch>
                        </div>
                    </Grid>
                </Grid>
            </Container >
        );
    }
}

function mapStateToProps(state, ownProps) {

    const chats = state.chats.entries;

    return {
        chats,
    };
}

function mapDispatchToProps(dispacth) {
    return {};
}

export const Layout = connect(mapStateToProps, mapDispatchToProps)(LayoutClass);