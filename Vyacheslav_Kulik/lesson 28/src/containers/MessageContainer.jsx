import {connect} from 'react-redux'
import React, {Component} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'

import {Message} from 'components/Message'
import {deleteChatsMessageAction, deleteChatsMessageFetchAction} from '../actions/chats'


export const MessageContainer = (props) => {
    const dispatch = useDispatch()
    const messageId = props.messages.id
    const chatId = useParams().id
    let indexDeleteMessage
    const isLoadingMessage = useSelector(state => state.chats.loadingMessage)
    const chats = useSelector(state => state.chats.entries)
    if (chatId && chats[chatId]) {
        const chatMessages = chats[chatId].messages
        const idMessage = props.messages.id + ''

        chatMessages.forEach((value, index) => {
            if (value.id === idMessage) {
                indexDeleteMessage = index // по id сообщения (nanoid) возвращаем id собщения (порядковый номер для slice), который нужно удалить
            }
        })

        const handleDeleteMessage = () => {

            dispatch(deleteChatsMessageFetchAction(messageId, indexDeleteMessage, chatId))
        }

        return <Message isLoadingMessage={isLoadingMessage} handleDeleteMessage={handleDeleteMessage}
                        messages={props.messages}/>

    }
}
//
// class MessageClass extends Component {
//
//     handleDeleteMessage = () => {
//         const {indexDeleteMessage, chatId, messageId, deleteChatsMessageFetchAction}  = this.props
//         deleteChatsMessageFetchAction(messageId, indexDeleteMessage, chatId)
//     }
//
//     render() {
//
//         return <Message isLoadingMessage={this.props.isLoadingMessage}  handleDeleteMessage={this.handleDeleteMessage} messages={this.props.messages}/>
//     }
//
// }
//
// function mapStateToProps(state, ownProps) {
//     const chatId = state.router.location.pathname.replace('/chats/','')
//
//     if(chatId && state.chats.entries[chatId]) {
//         const chatMessages = state.chats.entries[chatId].messages
//         const idMessage = ownProps.messages.id + ''
//         let indexDeleteMessage
//         chatMessages.forEach((value, index) => {
//             if(value.id === idMessage){
//                 indexDeleteMessage = index // по id сообщения (nanoid) возвращаем id собщения (порядковый номер для slice), который нужно удалить
//
//             }
//         })
//         return {
//             chatId: state.router.location.pathname.replace('/chats/',''),
//             indexDeleteMessage,
//             messageId: ownProps.messages.id,
//             isLoadingMessage: state.chats.loadingMessage
//         }
//     }
//
// }
//
// function mapDispatchToProps(dispatch) {
//     return {
//         deleteChatsMessageAction: (messageId, chatId) => dispatch(deleteChatsMessageAction(messageId, chatId)),
//         deleteChatsMessageFetchAction: (messageId, indexDeleteMessage, chatId) => dispatch(deleteChatsMessageFetchAction(messageId, indexDeleteMessage, chatId))
//     }
// }

// export const MessageContainer = connect(mapStateToProps, mapDispatchToProps)(MessageClass)