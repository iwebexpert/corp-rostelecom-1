import React, {Component} from 'react'
import {MessageForm} from '../MessageForm'
import {MessageFields} from '../MessageFields'
import moment from "moment";
import {nanoid} from "nanoid";

import './Messenger.scss'



export class Messenger extends Component {
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
            <div className="messenger">
                <MessageFields message={this.state.messages}/>
                <MessageForm onSend={this.getMessageFromForm}/>
            </div>
        )
    }

}
