import React, { Component } from 'react';
import { ListItem, IconButton } from '@material-ui/core';
import { nanoid } from 'nanoid';
import DeleteIcon from '@material-ui/icons/Delete';

import classNames from 'classnames';

import './Message.scss';

export class Message extends Component {

    render() {
        const { chatId, text, author, mid } = this.props;

        const classes = classNames('message', {
            'message-author': author !== 'ReactBot',
            'message-bot': author === 'ReactBot',
        });

        return (
            <li className={classes}>

                <b className="message-sender">({author})</b>
                <pre>{text}</pre>

                <IconButton key={nanoid()} aria-label="delete" onClick={() => this.props.handleMessageDelete(`${chatId}`, `${mid}`)}>
                    <DeleteIcon />
                </IconButton>
            </li>
        );
    }
}