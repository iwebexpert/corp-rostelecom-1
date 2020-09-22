import React, {Component} from 'react'
import {Message} from '../Message'

import './MessageFields.scss'

export class MessageFields extends Component {

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }


    render() {

        const allMessages = this.props.message.map((data, index) => (<Message key={data.id}  messages={data}/>))

        return (
            <div className="message-field">
                {allMessages}
                <div ref={element => { this.messagesEnd = element; }} />
            </div>

        )
    }

}
