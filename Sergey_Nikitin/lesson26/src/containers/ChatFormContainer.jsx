import React, { Component } from 'react';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';

import { push } from 'connected-react-router';

import { ChatsForm } from 'components/ChatsForm';
import { chatsLoadAction, chatsMessageSendAction, chatsAddAction } from '../actions/chats';

class ChatFormContainerClass extends Component {
    componentDidMount() {
        const { chatsLoadAction, chats } = this.props;

        if (!chats.length) {
            chatsLoadAction();
        }
    }


    chatAddHandler = (chat) => {
        const { chats, chatsAddAction, redirect } = this.props;
        chat.id = chats.length;//nanoid();
        chat.fire = false;
        chat.messages = [
            {
                id: 0,
                author: "Ghost",
                text: "Рыба!"
            }
        ];
        chatsAddAction(chat);
        redirect(chat.id);
    };

    render() {
        // const { messages } = this.props;

        return <ChatsForm onSend={this.chatAddHandler} />
    }
}

function mapStateToProps(state, ownProps) {

    const { match } = ownProps;
    const chats = state.chats.entries;

    let messages = null;

    if (match && chats[match.params.id]) {
        messages = chats[match.params.id].messages;
    }

    return {
        messages,
        chatId: match ? match.params.id : null,
        chats,
    };
}

function mapDispatchToProps(dispacth) {
    return {
        chatsLoadAction: () => dispacth(chatsLoadAction()),
        chatsAddAction: (chat) => dispacth(chatsAddAction(chat)),
        redirect: (id) => dispacth(push(`/chats/${id}`)),
    };
}

export const ChatFormContainer = connect(mapStateToProps, mapDispatchToProps)(ChatFormContainerClass);