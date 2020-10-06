import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { Grid, Container, List, ListItem, ListItemText, Paper, MenuList, MenuItem } from '@material-ui/core';
import { connect } from 'react-redux';

import { Messenger } from 'components/Messenger';
import { Header } from 'components/Header';
import { Profile } from 'components/Profile';

import { HomePage } from 'pages/Home';
import { AboutPage } from 'pages/About';
import { ContactsPage } from 'pages/Contacts';
import { NotFoundPage } from 'pages/PageNotFound';

import { chats as chatsData } from '../../helpers/chatsData';
import { profile as profilesData } from '../../helpers/profilesData';
import { routes } from '../../routes';
import './Layout.css';

class LayoutClass extends Component {
    render() {
        let { chats, handleChatDelete, profile, handleProfileDelete } = this.props;

        if (!chats.length) {
            chats = chatsData;
        };
        if (!profile.length) {
            profile = profilesData;
        };

        return (
            <Container className="back" maxWidth="xl">
                <Grid item xs={12}>
                    <Header />
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Paper className="card" elevation={5}>
                            <MenuList>
                                <MenuItem >
                                    <ListItemText primary="Профили" />
                                </MenuItem>
                                <List>
                                    {profile.map((item) => (<ListItem key={item.id}>
                                        <Link to={`/profile/${item.id}`}>
                                            <ListItemText primary={item.login} />
                                        </Link>
                                        <button onClick={handleProfileDelete}>Удалить профиль</button>
                                    </ListItem>))}
                                </List>
                                <MenuItem >
                                    <ListItemText primary="Чаты" />
                                </MenuItem>
                                <List>
                                    {chats.map((item) => (<ListItem key={item.id}>
                                        <Link to={`/chats/${item.id}`} className={item.fire}>
                                            <ListItemText primary={item.title} />
                                        </Link>
                                        <button onClick={handleChatDelete}>Удалить чат</button>
                                    </ListItem>))}
                                </List>
                            </MenuList>
                            <hr />
                            <div>
                                <Link to="/" >Главная</Link>
                            </div>
                            <div>
                                <Link to="/about">О нас</Link>
                            </div>
                            <div>
                                <Link to="/contacts" >Контакты</Link>
                            </div>
                            <div>
                                <Link to="/contacts1234">Page not found</Link>
                            </div>
                        </Paper>

                    </Grid>
                    <Grid item xs={9}>
                        <Paper className="card" elevation={5}>
                            <div>
                                <Switch>
                                    {routes.map((route, index) => (<Route key={index} {...route} />))}
                                </Switch>
                            </div>
                        </Paper>

                    </Grid>
                </Grid>

            </Container>
        );
    }
}

function mapStateToProps(state, ownProps) {

    const chats = state.chats.entries;
    const profile = state.profile.entries;

    return {
        chats,
        profile,
    };
}

function mapDispatchToProps(dispacth) {
    return {};
}

export const Layout = connect(mapStateToProps, mapDispatchToProps)(LayoutClass);