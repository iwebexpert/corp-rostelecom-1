import React, { Component } from 'react';
import {connect} from 'react-redux';
import {chatsLoadAction, messageSendAction} from '../actions/chats';
import {Messenger} from 'components/Messenger';
import {nanoid} from 'nanoid';

class MessengerContainerClass extends Component{

    componentDidMount(){
        const {chatsLoadAction} = this.props;
        chatsLoadAction();
    }
    handleMessageSend = (message) => {
        const {chatId, messageSendAction} = this.props;

        messageSendAction({
            ...message,
            chatId,
            id : nanoid()
        })
    }

    render(){
        const {messages} = this.props;
        return <Messenger messages={messages} handleMessageSend = {this.handleMessageSend}/>
    }
}

function mapStateToProps(state, ownProps){
    const {match} = ownProps;
    const chats = state.chats.entries;

    let messages = null;

    if(match && chats[match.params.id]){
        messages = chats[match.params.id].messages;
    }


    return {
        messages,
        chatId : match ? match.params.id : null,
    }
}

function mapDispatchToProps(dispatch){
    return {
        chatsLoadAction:() => dispatch(chatsLoadAction()),
        messageSendAction: (message) => dispatch(messageSendAction(message))
    };
}
export const MessengerContainer = connect(mapStateToProps, mapDispatchToProps)(MessengerContainerClass);