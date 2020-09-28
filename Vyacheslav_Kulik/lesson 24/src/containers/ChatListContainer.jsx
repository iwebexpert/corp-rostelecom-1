import {connect} from 'react-redux'
import React, {Component} from 'react'

import {ChatList} from 'components/ChatList'
import {addChatsAction} from 'actions/chats'

class ChatListClass extends Component {

    componentDidMount() {
        this.props.addChatsAction()
    }


    render() {
        return <ChatList chats={this.props.chats.entries}/>
    }

}

function mapStateToProps(state, ownProps) {
    return {
        ...state
    }


}

function mapDispatchToProps(dispatch) {
    return {
        addChatsAction: () => dispatch(addChatsAction())
    }
}

export const ChatListContainer = connect(mapStateToProps, mapDispatchToProps)(ChatListClass)