import React from 'react';

import { Message } from 'components/Message';

import './MessageList.css';

export const MessageList = (props) => {

    const items = props.items.map((item, index) => (<Message key={item.id} text={item.text} author={item.author} />));

    return (
        <ul className="message-list">
            {items}
        </ul>
    );

}