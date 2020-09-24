import React, { Component } from 'react'
import { Message } from 'components/Message'

import './MessageList.scss'

export class MessageList extends Component {
    render() {
        const { user } = this.props
        const items = this.props.items
            .map(item =>
                (<Message
                    key={item.id}
                    text={item.text}
                    bot={item.author === 'bot'}
                    user={user}
                />))
        return (
            <div className='messages__list'>{items}</div>
        )
    }
}
