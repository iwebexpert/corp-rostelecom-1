import React, { Component } from 'react';

export class Message extends Component {
    render() {
        const { text, author } = this.props;

        if (text) {
            return (
                <li>
                    {text} <b>({author})</b>
                </li>
            )
        }
        else
            return (
                ""
            )
    }
}
