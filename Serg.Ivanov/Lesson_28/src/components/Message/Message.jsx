import React from 'react';
import classNames from 'classnames';

import './Message.scss';

export const Message = (props) => {

    const { text, author } = props;

    const classes = classNames('message', {
        'message-author': author !== 'Bot',
        'message-bot': author === 'Bot',
    });

    return (
        <li className={classes}>
            {text} <b className="message-sender">({author})</b>
        </li>
    );
};