import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, ListItem, ListItemText, ListItemIcon, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Person from '@material-ui/icons/Person';
import { chats as chatsData } from '../../helpers/chatsData';

import './Chats.css';

class ChatsClass extends Component {
    render() {
        let { chats } = this.props;
        if (!chats.length) {
            chats = chatsData;
        }

        const { handleChatAdd } = this.props;
        return (
            <div>
                <List component="nav" aria-label="main mailbox folders">
                    {chats.map((item) => (
                        <ListItem button key={item.id}>
                            <ListItemIcon>
                                <Person />
                            </ListItemIcon>
                            <Link className="router_link" to={`/chats/${item.id}`}>
                                <ListItemText primary={item.title} />
                            </Link>
                        </ListItem>))}
                </List>
                <Divider />
                <Button onClick={handleChatAdd}>Добавить новый чат</Button>
            </div >
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

export const Chats = connect(mapStateToProps, mapDispatchToProps)(ChatsClass);