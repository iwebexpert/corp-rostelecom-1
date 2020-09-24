import React, { Component } from 'react';
import classNames from 'classnames';

import './Message.scss';

export class Message extends Component {

    render() {
        const { text, author } = this.props;

        const classes = classNames('message', {
            'message-author': author !== 'ReactBot',
            'message-bot': author === 'ReactBot',
        });

        return (
            <li className={classes}>
                <b className="message-sender">({author})</b>
                <pre>{text}</pre>
            </li>
        );
    }
}