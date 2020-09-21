import React, {Component} from 'react';
import classNames from 'classnames';

import './Message.scss';


export class Message extends Component {

    render(){
        const {text, author} = this.props;
        const classes = classNames('message', {
            'message-author': author !== 'Чатобот',
            'message-bot': author === 'Чатобот',
        });

        return (
        <li className={classes}>
            {text} <b className="message-sender">({author})</b>
        </li>
        );
    }
}