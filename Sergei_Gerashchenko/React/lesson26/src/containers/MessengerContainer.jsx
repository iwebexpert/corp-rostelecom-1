import React, { Component } from 'react';
import {connect} from 'react-redux';
import {chatsLoadAction, messageSendAction, messagesLoadAction} from '../actions/chats';
import {Messenger} from 'components/Messenger';
import {nanoid} from 'nanoid';

class MessengerContainerClass extends Component{

    componentDidMount(){
        const {messagesLoadAction, chatId} = this.props;

        console.log('MessengerContainerClass didmount', this.props);
        console.log('this', this);
    }
    handleMessageSend = (message) => {
        const {chatId, messageSendAction} = this.props;

        messageSendAction({
            ...message,
            chatId,
        })
    }


    render(){
        const {chatId, messages} = this.props;
        return <Messenger messages={messages} chatId={chatId} handleMessageSend = {this.handleMessageSend}/>
    }
}

function mapStateToProps(state, ownProps){
    console.log('State', state)
    console.log('OwnProps', ownProps)
    const {match} = ownProps;
    const chats = state.chats.entries;

    let messages = null;

    if(match && chats[match.params.chatId]){
        messages = chats[match.params.chatId].messages;
    }


    return {
        messages,
        chatId : match ? match.params.chatId : null,
    }
}

function mapDispatchToProps(dispatch){
    return {
        chatsLoadAction:() => dispatch(chatsLoadAction()),
        messageSendAction: (message) => dispatch(messageSendAction(message)),
        messagesLoadAction: (chatId) => dispatch(messagesLoadAction(chatId)),
    };
}
export const MessengerContainer = connect(mapStateToProps, mapDispatchToProps)(MessengerContainerClass);