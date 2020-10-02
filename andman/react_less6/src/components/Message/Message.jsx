import React, { Component } from 'react';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import './Message.scss';

export class Message extends Component {
    // get direction(){
    //     return this.props.author === 'Bot' ? 'start' : 'end';
    // }

    render() {
        const { text, author, msgId, handleMessageDel, chatId, chatIdUniq } = this.props;

        const classes = classNames('message', {
            'message-author': author !== 'Bot',
            'message-bot': author === 'Bot',
        });

        return (
            <li className={classes} key={msgId}>
                {text} <b className="message-sender">({author})</b>
                <IconButton aria-label="delete" onClick={(e) => { handleMessageDel({ msgId, chatIdUniq }, e) }} >
                    <DeleteIcon />
                </IconButton>
            </li >
        );
    }
}