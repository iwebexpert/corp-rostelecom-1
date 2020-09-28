import React, { Component } from 'react';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';

// import { Messenger } from 'components/Messenger';
import { ChatList } from 'components/ChatList';
import { chatsLoadAction, chatsAddAction } from '../actions/chats';

class ChatListContainerClass extends Component {
    componentDidMount() {
        const { chatsLoadAction } = this.props;
        chatsLoadAction();
    }

    handleChatAdd = (chat) => {
        //TODO
        const { chatsAddAction } = this.props;

        chatsAddAction({
            ...chat,
            // id: nanoid(),
        });
    }

    render() {
        const { chats } = this.props;

        return <ChatList chats={chats} handleChatAdd={this.handleChatAdd} />
    }
}

function mapStateToProps(state, ownProps) {

    const chats = state.chats.entries;



    return {
        chats,
    };
}

function mapDispatchToProps(dispacth) {
    return {
        chatsLoadAction: () => dispacth(chatsLoadAction()),
        chatsAddAction: (chat) => dispacth(chatsAddAction(chat)),
    };
}

export const ChatListContainer = connect(mapStateToProps, mapDispatchToProps)(ChatListContainerClass);