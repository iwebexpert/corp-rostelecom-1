import {connect} from 'react-redux'
import React, {Component} from 'react'

import {Message} from 'components/Message'
import {deleteChatsMessageAction} from '../actions/chats'


class MessageClass extends Component {

    handleDeleteMessage = () => {
        const {indexDeleteMessage, chatId}  = this.props
        this.props.deleteChatsMessageAction(indexDeleteMessage, chatId)
    }

    render() {
        return <Message handleDeleteMessage={this.handleDeleteMessage} messages={this.props.messages}/>
    }

}

function mapStateToProps(state, ownProps) {
    const chatId = state.router.location.pathname.replace('/chats/','')

    if(chatId && state.chats.entries[chatId]) {
        const chatMessages = state.chats.entries[chatId].messages
        const idMessage = ownProps.messages.id + ''
        let indexDeleteMessage
        chatMessages.forEach((value, index) => {
            if(value.id === idMessage){
                indexDeleteMessage = index // по id сообщения (nanoid) возвращаем id собщения (порядковый номер для slice), который нужно удалить

            }
        })
        return {
            chatId: state.router.location.pathname.replace('/chats/',''),
            indexDeleteMessage
        }
    }

}

function mapDispatchToProps(dispatch) {
    return {
        deleteChatsMessageAction: (messageId, chatId) => dispatch(deleteChatsMessageAction(messageId, chatId))
    }
}

export const MessageContainer = connect(mapStateToProps, mapDispatchToProps)(MessageClass)