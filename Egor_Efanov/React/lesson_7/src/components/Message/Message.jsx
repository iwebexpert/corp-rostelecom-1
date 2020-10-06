import React, { Component } from 'react';
import classNames from 'classnames';

import './Message.scss';

export class Message extends Component {


    render() {
        const { text, author } = this.props;

        const classes = classNames('message', {
            'message-author': author !== 'Bot',
            'message-bot': author === 'Bot',
        });

        return (
            <li className={classes}>
                {text} <b className="message-sender">({author})</b>
            </li>
        );
    }
}