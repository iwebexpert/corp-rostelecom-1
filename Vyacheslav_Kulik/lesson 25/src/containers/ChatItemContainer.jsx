import {connect} from 'react-redux'
import React, {Component} from 'react'
import { push } from 'connected-react-router'
import {ChatItem} from 'components/ChatItem'

class ChatItemClass extends Component {


    render() {
        const {currentChatId, redirect, ...chat} = this.props
        return <ChatItem redirectToChat={redirect} currentChatId={this.props.currentChatId} {...chat}/>
    }

}

function mapStateToProps(state, ownProps) {
    return {
        ...state,
    }


}

function mapDispatchToProps(dispatch) {
    return {
        redirect: (id) => dispatch(push(`/chats/${id}`))
    }
}

export const ChatItemContainer = connect(mapStateToProps, mapDispatchToProps)(ChatItemClass)