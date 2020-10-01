import React, { Component } from 'react';
import {connect} from 'react-redux';
import {chatsLoadAction} from '../actions/chats';
import {ChatList} from 'components/ChatList';

class ChatListContainerClass extends Component{

    componentDidMount(){
        const {chatsLoadAction} = this.props;
        chatsLoadAction();
    }

    render(){
        const {chats} = this.props;
        return <ChatList chats={chats} />
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
    };
}
export const ChatListContainer = connect(mapStateToProps, mapDispatchToProps)(ChatListContainerClass);