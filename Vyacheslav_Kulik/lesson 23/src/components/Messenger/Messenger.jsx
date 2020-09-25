import React, {Component} from 'react'
import {MessageForm} from '../MessageForm'
import {MessageFields} from '../MessageFields'
import {NonExistChat} from '../NonExistChat'
import moment from "moment"
import {nanoid} from "nanoid"
import {Grid} from '@material-ui/core'

import './Messenger.scss'


export class Messenger extends Component {

    get chats() {
        return this.props.chats
    }
    get isChat() {
        return !!this.chat
    }
    get messages() {
        if (this.isChat) {
            return this.chat.messages
        }
    }

    get chat() {
        if (this.props.match) {
            return this.chats[this.props.match.params.id]
        }

    }

    

    botAnswer = null

    addMessage = (message) => {
        const newChats = this.chats.slice()
        newChats[this.props.match.params.id].messages = newChats[this.props.match.params.id].messages.concat([message])
        this.props.getMessage(newChats)
    }

   
    componentDidUpdate(prevProps) {
        
        if (this.isChat) {
            if (this.botAnswer) {
                clearTimeout(this.botAnswer)
                this.botAnswer = null
            }
            const lastMessage = this.messages[this.messages.length - 1]
            if (lastMessage.author !== 'Bot') {
                this.botAnswer = setTimeout(this.answerFromBot, 2000, lastMessage)
            }
        }
        
    }


    answerFromBot = (lastMessage) => {
        this.addMessage({
            text: `Привет, <b>${lastMessage.author}</b>. Оператор скоро подключится к тебе`,
            author: 'Bot',
            time: moment(),
            id: nanoid()
        })
    }


    getMessageFromForm = (message, date) => {
        this.addMessage({...message, time: date, id: nanoid()})
    }


    render() {

        return (
            <Grid container wrap="nowrap" direction="column" justify="space-between" className='messenger'>
                {this.isChat ? <MessageFields message={this.messages}/> : <NonExistChat/>}
                {this.isChat && <MessageForm author={this.props.author} onSend={this.getMessageFromForm}/>}
            </Grid>
        )
    }

}
