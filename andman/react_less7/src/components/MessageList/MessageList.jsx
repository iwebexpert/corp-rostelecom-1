import React, { Component } from 'react';

import { Message } from 'components/Message';

import './MessageList.css';


export class MessageList extends Component {


    render() {
        const { handleMessageDel, chatId, chatIdUniq } = this.props;
        const items = this.props.items.map((item, index) => (<Message key={item.id}
            text={item.text}
            author={item.author}
            id={item.id}
            handleMessageDel={handleMessageDel}
            chatId={chatId}
        />
        ));

        return (
            <ul className="message-list">
                {items}
                <div id="flag" ref={(elem) => { if (elem) elem.scrollIntoView(); }} />
            </ul>

        );
    }
}