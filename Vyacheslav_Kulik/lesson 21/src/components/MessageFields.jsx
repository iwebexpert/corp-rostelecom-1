import React, {Component} from 'react'
import Message from './Message'
import moment from 'moment'


export default class MessageField extends Component {

    render() {

        const allMessages = this.props.message.map((data, index) => (<Message key={index}  messages={data}/>))

        return (
            <div>
                {allMessages}
            </div>
        )
    }

}
