import {connect} from 'react-redux'
import React, {Component} from 'react'
import {NewChatPage} from 'components/NewChatPage'
import {addChatsAction, addNewChatAction} from 'actions/chats'
import moment from "moment";

class NewChatPageClass extends Component {

    getNewChatTitle =  (title) =>  {
        this.props.addNewChatAction(title)
    }


    render() {
        return <NewChatPage getNewChatTitle={this.getNewChatTitle}/>
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
        addNewChatAction: (title) => dispatch(addNewChatAction(title))
    }
}

export const NewChatPageContainer = connect(mapStateToProps, mapDispatchToProps)(NewChatPageClass)