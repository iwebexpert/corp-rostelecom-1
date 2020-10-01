import React, { Component } from 'react';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';
import { push } from 'connected-react-router';

import { Chats } from 'components/Chats';
import { chatsAddAction } from '../actions/chats';

class ChatsContainerClass extends Component {
    componentDidMount() {
        const { chatsLoadAction, chats } = this.props;

        if (!chats.length) {
            chatsLoadAction();
        }
    }

    handleMessageSend = (message) => {
        const { chatId, chatsMessageSendAction } = this.props;

        chatsMessageSendAction({
            ...message,
            chatId,
            id: nanoid(),
        });
    }

    handleChatAdd = () => {
        const { chatsAddAction, lastId, redirect } = this.props;
        const title = prompt('Введите название чата', 'Chat1');

        if (title) {
            chatsAddAction(lastId, title);
            redirect(lastId);
        } else {
            alert('Введите название чата');
        }
    }

    render() {
        const { messages } = this.props;
        return <Chats handleChatAdd={this.handleChatAdd} />
    }
}

function mapStateToProps(state, ownProps) {

    const { match } = ownProps;
    const chats = state.chats.entries;

    let messages = null;

    if (match && chats[match.params.id]) {
        messages = chats[match.params.id].messages;
    }

    const lastId = Object.keys(chats).length ? Object.keys(chats).length : 0;

    return {
        messages,
        chatId: match ? match.params.id : null,
        lastId,
        chats,
    };
}

function mapDispatchToProps(dispacth) {
    return {
        chatsAddAction: (newChatId, title) => dispacth(chatsAddAction(newChatId, title)),
        redirect: (id) => dispacth(push(`/chats/${id}`)),
    };
}

export const ChatsContainer = connect(mapStateToProps, mapDispatchToProps)(ChatsContainerClass);