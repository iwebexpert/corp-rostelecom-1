import React, { Component } from 'react';
import {connect} from 'react-redux';
import {chatsLoadAction, messagesLoadAction} from '../actions/chats';
import {ChatList} from 'components/ChatList';

class ChatListContainerClass extends Component{

    componentDidMount(){
        const {chatsLoadAction, chats} = this.props;
        if(!chats.length)
            chatsLoadAction();
    }

    render(){
        const {chats, messagesLoadAction} = this.props;
        return <ChatList chats={chats} messagesLoadAction={messagesLoadAction} />
    }
}

function mapStateToProps(state, ownProps){
    const {match} = ownProps;
    const chats = state.chats.entries;



    return {
        chats
    };
}

function mapDispatchToProps(dispatch){
    return {
        chatsLoadAction:() => dispatch(chatsLoadAction()),
        messagesLoadAction: (chatId) => dispatch(messagesLoadAction(chatId)),
    };
}
export const ChatListContainer = connect(mapStateToProps, mapDispatchToProps)(ChatListContainerClass);