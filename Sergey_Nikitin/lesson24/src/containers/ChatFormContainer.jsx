import React, { Component } from 'react';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';

import { ChatsForm } from 'components/ChatsForm';
import { chatsLoadAction, chatsMessageSendAction, chatsAddAction } from '../actions/chats';

class ChatFormContainerClass extends Component {
    componentDidMount() {
        const { chatsLoadAction } = this.props;
        chatsLoadAction();
    }


    chatAddHandler = (chat) => {
        const { chats, chatsAddAction } = this.props;
        chat.id = chats.length;//nanoid();
        chat.messages = [
            {
                id: 0,
                author: "Ghost",
                text: "Рыба!"
            }
        ];
        chatsAddAction(chat);
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
    };
}

export const ChatFormContainer = connect(mapStateToProps, mapDispatchToProps)(ChatFormContainerClass);