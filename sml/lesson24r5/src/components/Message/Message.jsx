import React from 'react';
// import React, { Component } from 'react';
import classNames from 'classnames';

import './Message.scss';

export function Message(props) {
    // get direction(){
    //     return this.props.author === 'Bot' ? 'start' : 'end';
    // }
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
}



// export class Message extends Component {
//     // get direction(){
//     //     return this.props.author === 'Bot' ? 'start' : 'end';
//     // }

//     render() {
//         const { text, author } = this.props;

//         const classes = classNames('message', {
//             'message-author': author !== 'Bot',
//             'message-bot': author === 'Bot',
//         });

//         return (
//             <li className={classes}>
//                 {text} <b className="message-sender">({author})</b>
//             </li>
//         );
//     }
// }