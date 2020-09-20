import React, {Component} from 'react'
import {MessageMUI} from '../MessageMUI'
import {Grid} from '@material-ui/core'

import './MessageFieldsMUI.scss'

export class MessageFieldsMUI extends Component {

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }


    render() {

        const allMessages = this.props.message.map((data, index) => (<MessageMUI key={data.id}  messages={data}/>))

        return (
            <Grid container item xs wrap="nowrap" direction="column" className="message-field">
                {allMessages}
                <div ref={element => { this.messagesEnd = element; }} />
            </Grid>

        )
    }

}
