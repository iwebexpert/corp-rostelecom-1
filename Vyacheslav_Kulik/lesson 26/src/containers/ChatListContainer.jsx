import {connect} from 'react-redux'
import React, {Component} from 'react'

import {ChatList} from 'components/ChatList'
import {unfiredChatAction, loadChatsAction} from 'actions/chats'
import {loadProfileAction} from 'actions/profile'

class ChatListClass extends Component {

    componentDidMount(){
        this.props.loadChatsAction()
        this.props.loadProfileAction()
    }

    componentDidUpdate() {
        const {currentChatId} = this.props
        if(this.props.chats.entries[currentChatId] && this.props.chats.entries[currentChatId].fired) { //если текущий чат помечен непрочитанным
            this.props.unfiredChatAction(currentChatId) //то помечаем его прочитанным
        }
    }

    render() {
        const {currentChatId, isLoading, isError, loadChatsAction} = this.props
        return <ChatList loadChatsAction={loadChatsAction} isLoading={isLoading} isError={isError} chats={this.props.chats.entries} currentChatId={currentChatId}/>
    }

}

function mapStateToProps(state, ownProps) {
    return {
        ...state,
        currentChatId: state.router.location.pathname.replace('/chats/',''),
        isLoading: state.chats.loading,
        isError: state.chats.error
    }


}

function mapDispatchToProps(dispatch) {
    return {
        unfiredChatAction: (chatId) => dispatch(unfiredChatAction(chatId)),
        loadChatsAction: () => dispatch(loadChatsAction()),
        loadProfileAction: () => dispatch(loadProfileAction()),


    }
}

export const ChatListContainer = connect(mapStateToProps, mapDispatchToProps)(ChatListClass)