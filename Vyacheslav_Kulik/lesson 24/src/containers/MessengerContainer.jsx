import {connect} from 'react-redux'
import React, {Component} from 'react'

import {Messenger} from 'components/Messenger'
import {addChatsAction, addChatsMessageAction} from 'actions/chats'

class MessengerContainerClass extends Component {

    componentDidMount() {
        this.props.addChatsAction()
    }


    render() {
        console.log(this.props)
        return <Messenger author={this.props.author} chats={this.props.chats.entries} getMessage={this.getMessage} match={this.props.match}/>
        //return null
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