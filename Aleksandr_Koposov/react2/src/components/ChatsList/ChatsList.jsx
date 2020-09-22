import React, { Component } from 'react'

import { List, Divider } from '@material-ui/core'

import { ChatItem } from 'components/ChatItem'
import { ChatForm } from 'components/ChatForm'

import './ChatsList.scss'

export class ChatsList extends Component {
    render() {
        const { match, onAdd } = this.props
        const id = +((match || {}).params || {}).id || 0
        return (
            <List className="chats-list">
                {(this.props.chats || []).map(item => (
                    <ChatItem
                        key={item.id}
                        item={item}
                        active={id === item.id}
                    />
                ))}
                <Divider />
                <ChatForm onAdd={onAdd} />
            </List>
        )
    }
}


