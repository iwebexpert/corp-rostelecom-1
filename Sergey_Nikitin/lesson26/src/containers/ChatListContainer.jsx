import React, { Component } from 'react';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';

import { ChatList } from 'components/ChatList';
import { chatsLoadAction, chatsMessageSendAction } from '../actions/chats';

class ChatListContainerClass extends Component {
    componentDidMount() {
        const { chatsLoadAction, chats } = this.props;
        if (!chats.length) {
            chatsLoadAction();
        }
    }
    handleReloadChats = () => {
        const { chatsLoadAction } = this.props;
        chatsLoadAction();
    };

    render() {
        const { chats, isError, isLoading } = this.props;

        return <ChatList chats={chats}
            handleReloadChats={this.handleReloadChats}
            isError={isError}
            isLoading={isLoading}
        />
    }
}

function mapStateToProps(state, ownProps) {

    const { match } = ownProps;
    const chats = state.chats.entries;
    return {
        chats,
        isLoading: state.chats.loading,
        isError: state.chats.error,
    };
}

function mapDispatchToProps(dispacth) {

    return {
        chatsLoadAction: () => dispacth(chatsLoadAction()),
        chatsMessageSendAction: (message) => dispacth(chatsMessageSendAction(message)),
    };
}

export const ChatListContainer = connect(mapStateToProps, mapDispatchToProps)(ChatListContainerClass);