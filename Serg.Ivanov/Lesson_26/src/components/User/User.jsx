import React, { Component } from 'react';
// import classNames from 'classnames';

import './User.css';

export class User extends Component {
    // get direction(){
    //     return this.props.author === 'Bot' ? 'start' : 'end';
    // }

    render() {
        const { name, age, from } = this.props;

        // const classes = classNames('message', {
        //     'message-author': author !== 'Bot',
        //     'message-bot': author === 'Bot',
        // });

        return (
            <ul className="user">
                <li>{name}</li>
                <li>{age}</li>
                <li>{from}</li>
            </ul>
        );
    }
}