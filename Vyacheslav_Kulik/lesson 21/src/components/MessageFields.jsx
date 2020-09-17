import React, {Component} from 'react'
import Message from './Message'
import moment from 'moment'


export default class MessageField extends Component {

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }


    render() {

        const allMessages = this.props.message.map((data, index) => (<Message key={index}  messages={data}/>))

        return (
            <div className="messageField">
                {allMessages}
                <div ref={element => { this.messagesEnd = element; }} />
            </div>

        )
    }

}
