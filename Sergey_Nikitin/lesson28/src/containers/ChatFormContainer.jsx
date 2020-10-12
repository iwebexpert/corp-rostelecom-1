import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { ChatsForm } from 'components/ChatsForm';
import { chatsLoadAction, chatsAddAction } from '../actions/chats';


export const ChatFormContainer = (props) => {

    const dispacth = useDispatch();
    const [isLoading, isError] = useSelector((state) => ([state.chats.loading, state.chats.error]));
    // console.log(chats);
    const chats = useSelector((state) => state.chats.entries);

    useEffect(() => {
        if (!chats.length) {
            dispacth(chatsLoadAction());
        }
    }, []);

    const chatAddHandler = (chat) => {
        chat.id = chats.length;//nanoid();
        chat.fire = false;
        chat.messages = [
            {
                id: 0,
                author: "Ghost",
                text: "Рыба!"
            }
        ];
        dispacth(chatsAddAction(chat));
        dispacth(push(`/chats/${chat.id}`));

    };


    return <ChatsForm onSend={chatAddHandler} />
};

/*import React, { Component } from 'react';
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

export const ChatFormContainer = connect(mapStateToProps, mapDispatchToProps)(ChatFormContainerClass);*/