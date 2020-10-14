import React, { Component } from 'react';

import { Message } from 'components/Message';

import './MessageList.css';

export class MessageList extends Component {
    constructor(props) {
        super(props);
        this.listRef = React.createRef();
    }

    componentDidUpdate() {
        //автоскролл сообщений
        const element = this.listRef.current;
        element.scrollTop = 9999;
    }

    render() {
        const items = this.props.items ? this.props.items.map((item, index) => (
            <Message key={item.id} chatId={this.props.chatId} mid={item.id} text={item.text} author={item.author} handleMessageDelete={this.props.handleMessageDelete} />
        )) : <li></li>;

        return (
            <ul className="message-list" ref={this.listRef}>
                {items}
            </ul>
        );
    }
}