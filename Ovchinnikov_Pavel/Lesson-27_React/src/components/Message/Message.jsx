import React from 'react';
import classNames from 'classnames';

import './Message.scss';

export const Message = (props) => {
    const { text, author } = props;

    const classes = classNames('message', {
        'message-author': author !== 'АвтоБот',
        'message-bot': author === 'АвтоБот',
    });

    if (text) {
        return (
            <li className={classes}>
                {text} <b className="message-sender">({author})</b>
            </li>
        )
    }
    else
        return null;
};