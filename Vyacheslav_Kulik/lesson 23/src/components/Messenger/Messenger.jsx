import React, {Component} from 'react'
import {MessageForm} from '../MessageForm'
import {MessageFields} from '../MessageFields'
import {NonExistChat} from '../NonExistChat'
import moment from "moment";
import {nanoid} from "nanoid"
import {Grid} from '@material-ui/core'
import {chats} from 'helpers/chats'

import './Messenger.scss'


export class Messenger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chats
        }
    }

    get chats() {
        return this.state.chats
    }

    get messages() {
        if (this.isChat) {
            return this.chat.messages
        }
    }

    get chat() {
        //console.log(this.props.match)
        if (this.props.match) {
            return this.chats[this.props.match.params.id]
        }

    }

    get isChat() {
        return !!this.chat
    }

    botAnswer = null

    addMessage = (message) => {
        const newChats = this.chats.slice()
        newChats[this.props.match.params.id].messages = newChats[this.props.match.params.id].messages.concat([message])
        this.setState({
            chats: newChats
        })
    }

    addChat = (title) => {
        //const newChats = this.chats.slice()
        //console.log(this.chats)
        this.setState({
            chats: [
                ...this.chats,
                {
                    id: this.chats.length + '',
                    title: title,
                    srcAvatar: 'src/img/bot.svg',
                    messages: [{
                        id: '0',
                        author: 'Bot',
                        time: moment(),
                        text: 'Привет, это новый чат!'
                    }]
                }
            ]

        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.newChat) {
            //console.log(this.props.newChat, 'this.props.newChat')
            this.addChat(this.props.newChat)

        }

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
        const {getChats, match} = this.props
        if (typeof getChats === 'function' && prevProps.newChat) {
            getChats(this.chats)
            //console.log(prevProps, 'prevProps')
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

    componentDidMount() {
        const {getChats, match} = this.props
        if (typeof getChats === 'function') {
            getChats(this.chats)
        }


    }



    render() {

        return (
            <Grid container wrap="nowrap" direction="column" justify="space-between" className='messenger'>
                {this.isChat ? <MessageFields message={this.messages}/> : <NonExistChat/>}
                {this.isChat && <MessageForm onSend={this.getMessageFromForm}/>}
            </Grid>
        )
    }

}
