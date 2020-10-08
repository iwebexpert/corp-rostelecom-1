import {connect} from 'react-redux'
import React from 'react'
import {useParams, useRouteMatch} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import {Messenger} from 'components/Messenger'
import {addChatsMessageAction, addChatsMessageFetchAction} from 'actions/chats'


export const MessengerContainer = (props) => {
    const dispatch = useDispatch()
    const match = useRouteMatch()
    const {author} = useSelector(state => state.profile.entries)
    const chats = useSelector(state => state.chats.entries)
    const chat = match && chats[match.params.id] ? chats[match.params.id] : null
    const chatId = useParams().id

    const getMessage = (message) => {
        dispatch(addChatsMessageFetchAction(message, chatId))
    }
    return  <Messenger author={author} chat={chat} getMessage={getMessage} match={match}/>

}
//
// class MessengerContainerClass extends Component {
//
//     getMessage = (message) => {
//         const {chatId} = this.props
//         //this.props.addChatsMessageAction(message, chatId)
//         this.props.addChatsMessageFetchAction(message, chatId)
//     }
//
//     render() {
//         const {author} = this.props
//         return <Messenger author={author} chat={this.props.chat} getMessage={this.getMessage} match={this.props.match}/>
//     }
//
// }
//
// function mapStateToProps(state, ownProps) {
//     const {match} = ownProps
//     const chats = state.chats.entries
//     if(match && chats[match.params.id]) {
//         return {
//             chat: chats[match.params.id],
//             chatId: ownProps.match.params.id,
//             author: state.profile.entries.author
//
//         }
//     }
//     return { //TODO
//         author: state.profile.entries.author
//     }
// }
//
// function mapDispatchToProps(dispatch) {
//     return {
//         addChatsMessageAction: (message, chatId) => dispatch(addChatsMessageAction(message, chatId)),
//         addChatsMessageFetchAction: (message, chatId) => dispatch(addChatsMessageFetchAction(message, chatId))
//     }
// }
//
// export const MessengerContainer = connect(mapStateToProps, mapDispatchToProps)(MessengerContainerClass)