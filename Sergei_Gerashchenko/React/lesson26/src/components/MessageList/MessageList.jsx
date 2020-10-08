import React, {Component} from 'react';

import {Message} from 'components/Message';

import './MessageList.css';

export class MessageList extends Component {
    render(){
        const {chatId} = this.props;
        let {messages} = this.props;
        if(!messages){
            messages = [];
        }
        const items = messages.map((item, index) => (<Message key={item.id} text={item.text} author={item.author} />));

        return (
            <ul className="message-list">
                {items}
            </ul>
        );
    }
}