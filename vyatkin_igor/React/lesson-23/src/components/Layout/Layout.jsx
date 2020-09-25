import React, { Component } from 'react';
import { Grid, Container, List, ListItem, ListItemText } from '@material-ui/core';
import { Link, Switch, Route } from 'react-router-dom';

import { Header } from 'components/Header';
// import { ChatList } from 'components/ChatList';
// import { Messenger } from 'components/Messenger';

import { chats } from '../../helpers/chatsData';
import {routes} from '../../routes';

//import {ProfilePage} from '../../pages/Profile';
// import { HomePage } from '../../pages/Home';
// import { AboutPage } from '../../pages/About';
// import { ContactsPage } from '../../pages/Contacts';
// import { NotFoundPage } from '../../pages/PageNotFound';


export class Layout extends Component {
    render() {
        return (
            <Container maxWidth="xl">
                
                <Grid item xs={12}>
                    <Header />
                </Grid>
               

                 {/* <div>
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
                </div> */}

                {/*<div>
                    <Switch>
                        <Route path="/" exact>
                            <HomePage />
                        </Route>
                        <Route path="/about" exact>
                            <AboutPage />
                        </Route>
                        <Route path="/contacts" component={ContactsPage} exact />
                        <Route path="/chats/:id" component={Messenger} />
                        <Route path="*" component={NotFoundPage} />
                        {routes.map((route, index) => (<Route key={index} {...route} />))} 
                    </Switch>
                </div> */}


                <Grid container spacing={1}>
                    <Grid item xs={1}>
                        {/* <ChatList /> */}

                        <List>
                            {chats.map((item) => (<ListItem key={item.id}>
                                <Link to={`/chats/${item.id}`}>
                                    <ListItemText primary={item.title} />
                                </Link>
                            </ListItem>))}
                            <Link to="/profile">Profile</Link> 
                        </List>

                    </Grid>

                    <Grid item xs={11}>
                    <Switch>
                    {routes.map((route, index) => (<Route key={index} {...route} />))}
                    {/* <Route path="/profile" exact component={ProfilePage} />  */}
                    </Switch>

                    </Grid>
                </Grid>
                
            </Container>
        );
    }
}