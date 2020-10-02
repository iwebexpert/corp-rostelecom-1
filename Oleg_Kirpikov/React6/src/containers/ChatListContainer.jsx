import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ChatList } from 'components/ChatList';
import { chatsLoadAction, chatsAddAction, chatsBlinkAction, chatsDeleteAction } from '../actions/chats';
import { push } from 'connected-react-router';


class ChatListContainerClass extends Component {


    constructor(props) {
        super(props);
        const { chatsLoadAction } = props;
        if (!props.chats) {
            chatsLoadAction();
        }
    }

    handleChatAdd = (newchat) => {
        const { chatsAddAction } = this.props;
        chatsAddAction(newchat);

    }

    handleChatDelete = (chatId) => {
        const { chatsDeleteAction } = this.props;
        chatsDeleteAction(chatId);
    }

    render() {
        return <ChatList chats={this.props.chats} push={this.props.push} handleChatAdd={this.handleChatAdd} handleChatDelete={this.handleChatDelete} />
    }
}

function mapStateToProps(state) {
    const chats = state.chats;
    return {
        chats,
    };
}

function mapDispatchToProps(dispacth) {
    return {
        chatsLoadAction: () => dispacth(chatsLoadAction()),
        chatsAddAction: (newchat) => dispacth(chatsAddAction(newchat)),
        chatsDeleteAction: (chatId) => dispacth(chatsDeleteAction(chatId)),
        chatsBlinkAction: (chatId) => dispacth(chatsBlinkAction(chatId)),
        chatsUnBlinkAction: () => dispacth(chatsUnBlinkAction()),
        push: (link) => dispacth(push(link)),
    };
}

export const ChatListContainer = connect(mapStateToProps, mapDispatchToProps)(ChatListContainerClass);