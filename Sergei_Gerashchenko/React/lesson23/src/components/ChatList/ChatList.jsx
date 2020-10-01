import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import SendIcon from '@material-ui/icons/Send';


import './ChatList.css';
//import {chats} from '../../helpers/chatsData';
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export class ChatList extends Component {
    render(){
        console.log('props ', this.props)
        const {chats} = this.props;
            return (
                <List component="nav"
                      aria-labelledby="nested-list-subheader">
                    {chats.map((item) => (<ListItem key={item.id}>
                        <Link to={`/chats/${item.id}`}>
                            <ListItemText primary={item.title} />
                        </Link>
                    </ListItem>))}
                </List>
        );
    };
}