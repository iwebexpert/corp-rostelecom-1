import React, { Component } from 'react';
import classNames from 'classnames';

import './Message.scss';

export class Message extends Component {
    // get direction(){
    //     return this.props.author === 'Bot' ? 'start' : 'end';
    // }

    render() {
        const { text, author } = this.props;

        const classes = classNames('message', {
            'message-author': author !== 'bot',
            'message-bot': author === 'bot',
        });

        return (
            <li className={classes}>
                {text} <b className="message-sender">({author})</b>
            </li>
        );
    }
}