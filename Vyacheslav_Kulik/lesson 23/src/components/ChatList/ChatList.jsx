import React, {Component} from 'react'
import {Avatar, List, ListItem, ListItemAvatar , ListItemIcon, ListItemText,  Grid} from '@material-ui/core'
import InboxIcon from '@material-ui/icons/Inbox'

export class ChatList extends Component {

    render() {

        return (<Grid container direction="column">
            <List component="nav" aria-label="main mailbox folders">
                <ListItem>
                    <ListItemAvatar>
                        <Avatar src='src/img/bot.svg'/>
                    </ListItemAvatar >
                    <ListItemText>Bot</ListItemText>
                </ListItem>

                <ListItem>
                    <ListItemAvatar>
                        <Avatar src='src/img/bot.svg'/>
                    </ListItemAvatar >
                    <ListItemText>Bot 1</ListItemText>
                </ListItem>

                <ListItem>
                    <ListItemAvatar>
                        <Avatar src='src/img/bot.svg'/>
                    </ListItemAvatar >
                    <ListItemText>Bot 123456789</ListItemText>
                </ListItem>

                <ListItem>
                    <ListItemAvatar>
                        <Avatar src='src/img/bot.svg'/>
                    </ListItemAvatar >
                    <ListItemText>Bot</ListItemText>
                </ListItem>
            </List>
        </Grid>)

    }

}
