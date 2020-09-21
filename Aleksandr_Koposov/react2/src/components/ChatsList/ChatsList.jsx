import React, { Component } from 'react'
import { nanoid } from 'nanoid'
import { List } from '@material-ui/core'

import { ChatItem } from 'components/ChatItem'

import './ChatsList.scss'

export class ChatsList extends Component {
    state = {
        chats: [
            { id: nanoid(), name: 'Chat 1', active: false, users: [1, 2, 3] },
            { id: nanoid(), name: 'Chat 2', active: true, users: [1] },
            { id: nanoid(), name: 'Chat 3', active: false, users: [] },
            { id: nanoid(), name: 'Chat 4', active: false, users: [1, 2, 3, 4, 5, 6] }
        ]
    }
    render() {
        return (
            <List className="chats-list">
                {this.state.chats.map(item => (
                    <ChatItem
                        key={item.id}
                        item={item}
                    />
                ))}
            </List>
        )
    }
}


