import React, {Component} from 'react'
import {MessageFormMUI} from '../MessageFormMUI'
import {MessageFieldsMUI} from '../MessageFieldsMUI'
import moment from "moment";
import {nanoid} from "nanoid";
import {Grid} from '@material-ui/core'

import './MessengerMUI.scss'


export class MessengerMUI extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [{
                text: 'Привет, я бот. Какой у вас вопрос?',
                author: 'Bot',
                time: moment(),
                id: nanoid()
            }]
        }

    }

    botAnswer = null

    componentDidUpdate() {

        if (this.botAnswer) {
            clearTimeout(this.botAnswer)
            this.botAnswer = null
        }
        const lastMessage = this.state.messages[this.state.messages.length - 1]
        if (lastMessage.author !== 'Bot') {
            this.botAnswer = setTimeout(this.answerFromBot, 2000, lastMessage)
        }


    }

    answerFromBot = (lastMessage) => {
        this.setState({
            messages: this.state.messages.concat([{
                text: `Привет, <b>${lastMessage.author}</b>. Оператор скоро подключится к тебе`,
                author: 'Bot',
                time: moment(),
                id: nanoid()
            }])
        })
    }


    getMessageFromForm = (message, date) => {

        this.setState({
            messages: this.state.messages.concat([{
                text: message.text,
                author: message.author,
                time: date,
                id: nanoid()
            }])
        })

    }


    render() {
        return (
            <Grid container wrap="nowrap" direction="column" justify="space-between" className='messenger'>
                <MessageFieldsMUI message={this.state.messages}/>
                <MessageFormMUI onSend={this.getMessageFromForm}/>
            </Grid>
        )
    }

}
