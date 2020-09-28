import React, { Component } from 'react';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';

import { ChatList } from 'components/ChatList';
import { chatsLoadAction, chatsAddAction } from '../actions/chats';


class ChatListContainerClass extends Component {


    constructor(props) {
        super(props);
        const { chatsLoadAction } = props;
        chatsLoadAction();
    }

    handleChatAdd = (newchat) => {
        const { chatsAddAction } = this.props;
        chatsAddAction(newchat)
    }


    render() {
        return <ChatList chats={this.props.chats} handleChatAdd={this.handleChatAdd} />
    }
}

function mapStateToProps(state) {
    const chats = state.chats.entries;
    return {
        chats,
    };
}

function mapDispatchToProps(dispacth) {
    return {
        chatsLoadAction: () => dispacth(chatsLoadAction()),
        chatsAddAction: (newchat) => dispacth(chatsAddAction(newchat)),
    };
}

export const ChatListContainer = connect(mapStateToProps, mapDispatchToProps)(ChatListContainerClass);