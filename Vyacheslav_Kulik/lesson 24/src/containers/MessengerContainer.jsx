import {connect} from 'react-redux'
import React, {Component} from 'react'

import {Messenger} from 'components/Messenger'
import {addChatsAction, addChatsMessageAction} from 'actions/chats'

class MessengerContainerClass extends Component {

    // componentDidMount() {
    //     this.props.addChatsAction()
    // }

    getMessage = (chats) => {
        this.props.addChatsMessageAction(chats)
    }

    render() {

        const {author} = this.props.profile.entries
        return <Messenger author={author} chats={this.props.chats.entries} getMessage={this.getMessage} match={this.props.match}/>
    }

}

function mapStateToProps(state, ownProps) {
    return {
        ...state
    }


}

function mapDispatchToProps(dispatch) {
    return {
        addChatsAction: () => dispatch(addChatsAction()),
        addChatsMessageAction: (message) => dispatch(addChatsMessageAction(message))
    }
}

export const MessengerContainer = connect(mapStateToProps, mapDispatchToProps)(MessengerContainerClass)