import {connect} from 'react-redux'
import React, {Component} from 'react'

import {Messenger} from 'components/Messenger'
import {addChatsMessageAction} from 'actions/chats'

class MessengerContainerClass extends Component {

    // componentDidUpdate() {
    //     console.log('componentDidUpdate')
    //     console.log(this.props)
    // }


    getMessage = (message) => {
        //console.log(message)
        const {chatId} = this.props
        this.props.addChatsMessageAction(message, chatId)
    }

    render() {
        const {author} = this.props
        return <Messenger author={author} chat={this.props.chat} getMessage={this.getMessage} match={this.props.match}/>
    }

}

function mapStateToProps(state, ownProps) {
    const {match} = ownProps
    const chats = state.chats.entries
    if(match && chats[match.params.id]) {
        return {
            chat: chats[match.params.id],
            chatId: ownProps.match.params.id,
            author: state.profile.entries.author
        }
    }

    return {
        chat: chats[match.params.id],
        chatId: ownProps.match.params.id,
        author: state.profile.entries.author
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addChatsMessageAction: (message, chatId) => dispatch(addChatsMessageAction(message, chatId))
    }
}

export const MessengerContainer = connect(mapStateToProps, mapDispatchToProps)(MessengerContainerClass)