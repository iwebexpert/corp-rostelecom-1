import React, { Component } from 'react';

export class Message extends Component {
    render() {
        const { text, author, classStyle } = this.props;
        return (
            <div class={classStyle}>
                <b>{author}</b>
                <br />
                {text}
            </div>
        );
    }
}