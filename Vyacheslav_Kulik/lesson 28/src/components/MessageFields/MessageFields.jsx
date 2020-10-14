import React, {useEffect, useRef} from 'react'

import {MessageContainer as Message} from '../../containers/MessageContainer'
//import {Message} from '../../components/Message'
import {Grid} from '@material-ui/core'

import './MessageFields.scss'

export const MessageFields = (props) => {

    const messagesEnd = useRef(null)
    const scrollToBottom = () => {
        messagesEnd.current.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom()
    })

    const allMessages = props.message.map((data, index) => (<Message key={data.id}  messages={data}/>))
    return (
        <Grid container item xs wrap="nowrap" direction="column" className="message-field">
            {allMessages}
            <div ref={messagesEnd} />
        </Grid>

    )
}

// export class MessageFields extends Component {
//
//     scrollToBottom = () => {
//         this.messagesEnd.scrollIntoView({ behavior: "smooth" });
//     }
//
//     componentDidUpdate() {
//         this.scrollToBottom();
//     }
//
//
//     render() {
//         const allMessages = this.props.message.map((data, index) => (<Message key={data.id}  messages={data}/>))
//
//         return (
//             <Grid container item xs wrap="nowrap" direction="column" className="message-field">
//                 {allMessages}
//                 <div ref={element => { this.messagesEnd = element; }} />
//             </Grid>
//
//         )
//     }
//
// }
