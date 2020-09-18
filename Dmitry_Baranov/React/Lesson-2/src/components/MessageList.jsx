import React, {Component} from 'react';

import {Message} from './Message';

export class MessageList extends Component {
    render(){
        const items = this.props.items.map((item, index) => (<Message key={index} text={item.text} author={item.author} />));

        return (
            <ul>
                {items}
            </ul>
        );
    }
}