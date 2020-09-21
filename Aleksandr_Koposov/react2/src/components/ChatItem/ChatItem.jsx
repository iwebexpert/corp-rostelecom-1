import React, { Component } from 'react'
import classNames from 'classnames'
import { ListItem, ListItemIcon, ListItemText, Avatar, ListItemAvatar, Icon } from '@material-ui/core'

import './ChatItem.scss'

export class ChatItem extends Component {
    render() {
        const { name, active, users } = this.props.item
        const classes = classNames('chat', {
            'active': active
        })
        return (
            <ListItem
                selected={active}
                className={classes}
                button
            >
                <ListItemAvatar>
                    <Avatar>
                        <Icon>chat</Icon>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={name} secondary={'Пользователей: ' + users.length} />
                <ListItemIcon>
                    <Icon>exit_to_app</Icon>
                </ListItemIcon>
            </ListItem>
        )
    }
}
