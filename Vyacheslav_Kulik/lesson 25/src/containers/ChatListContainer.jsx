import {connect} from 'react-redux'
import React, {Component} from 'react'

import {ChatList} from 'components/ChatList'
import {unfiredChatAction} from 'actions/chats'

class ChatListClass extends Component {

    componentDidUpdate() {
        const {currentChatId} = this.props
        if(this.props.chats.entries[currentChatId] && this.props.chats.entries[currentChatId].fired) { //если текущий чат помечен непрочитанным
            this.props.unfiredChatAction(currentChatId) //то помечаем его прочитанным
        }
    }

    render() {
        const {currentChatId} = this.props
        return <ChatList chats={this.props.chats.entries} currentChatId={currentChatId}/>
    }

}

function mapStateToProps(state, ownProps) {
    return {
        ...state,
        currentChatId: state.router.location.pathname.replace('/chats/','')
    }


}

function mapDispatchToProps(dispatch) {
    return {
        unfiredChatAction: (chatId) => dispatch(unfiredChatAction(chatId)),

    }
}

export const ChatListContainer = connect(mapStateToProps, mapDispatchToProps)(ChatListClass)