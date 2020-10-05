import React, { Component } from 'react';

import { Message } from 'components/Message';

import './MessageList.css';

export class MessageList extends Component {
    render() {
        const items = this.props.items.map((item, index) => (<Message key={item.id} text={item.text} author={item.author} />));

        return (
            <ul className="message-list">
                {items}
            </ul>
        );
    }
}