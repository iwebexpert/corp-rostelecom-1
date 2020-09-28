import React, { Component } from 'react';
import { Button, Grid, Container, List, ListItem, ListItemText } from '@material-ui/core';
import { ChatForm } from 'components/Chat';
import { ProfileName } from 'components/ProfileName';
import { Link, Switch, Route } from 'react-router-dom';

// import './MessageList.css';

export class ChatList extends Component {
    handleAuthorSend = () => {
        console.log('ProfileName chatList', this.state)
        this.setState({
            author: author,
            chats: chats

        });

    };

    render() {

        console.log('ChatList hrender', this.state)
        let chats = this.props.items.chats
        console.log(chats)
        console.log(chats[0].title)
        const items = chats.map((item, index) => (<li>{item.title}</li>));

        return (
            <div>
                <List>
                    {chats.map((item) => (<ListItem key={item.id}>
                        <Link to={`/chats/${item.id}`}>
                            <ListItemText primary={item.title} />
                        </Link>
                    </ListItem>))}
                </List>
            </div>
            // <ul>
            //     {items}
            // </ul>
        );

    }
}
