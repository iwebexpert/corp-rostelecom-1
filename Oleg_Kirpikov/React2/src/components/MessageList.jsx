import React, { Component } from 'react';

import { Message } from './Message';

export class MessageList extends Component {
    render() {
        const items = this.props.items.slice(-10).map((item, index) => (
            <Message key={index} text={item.text} author={item.author} classStyle={item.classStyle} />
        ));

        return (
            <div>
                {items}
            </div>
        );
    }
}