import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { Grid, Container, List, ListItem, ListItemText } from '@material-ui/core';
import { nanoid } from 'nanoid';

/*import { Messenger } from 'components/Messenger';*/
import { MessengerContainer as Messenger } from 'containers/MessengerContainer';

//import { Header } from 'components/Header';
import { HeaderContainer as Header } from 'containers/HeaderContainer';


import './Layout.css';
import { routes } from '../../routes';
//import { ChatList } from 'components/ChatList';
import { ChatListContainer as ChatList } from 'containers/ChatListContainer';
//import { ChatsForm } from 'components/ChatsForm';
import { ChatFormContainer as ChatsForm } from 'containers/ChatFormContainer';
import { Profile } from 'components/Profile';


export class Layout extends Component {
    //TODO
    /* state = {
         chates: chats,
     };*/

    /*chatAddHandler = (chat) => {
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
    };*/
    // messageAddHandler = (message) => {

    // };
    render() {
        //console.log(this.state.chates);
        return (
            <Container maxWidth="xl" >
                <Grid item xs={12} >
                    <Header text="Messanger" />
                </Grid>
                <Grid container direction="row">
                    <Grid item>
                        <div>
                            <ChatList />
                            <ChatsForm />
                        </div>
                    </Grid>
                    <Grid item xs={9}>
                        <div>
                            <Switch>
                                <Route path="/chats/:id" render={(props) => <Messenger  {...props} />} />
                                {routes.map((route, index) => (<Route key={index} {...route} />))}
                            </Switch>
                        </div>
                    </Grid>
                </Grid>


            </Container>
        );
    }
}