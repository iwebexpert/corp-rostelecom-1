import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { nanoid } from 'nanoid';
import { push } from 'connected-react-router';


// import { Messenger } from 'components/Messenger';
import { ChatList } from 'components/ChatList';
import { chatsLoadAction, chatsAddAction, chatDeleteAction } from '../actions/chats';
import { CompareArrowsOutlined } from '@material-ui/icons';
//import { Redirect } from 'react-router-dom';

class ChatListContainerClass extends Component {
    componentDidMount() {
        const { chatsLoadAction } = this.props;
        chatsLoadAction();
    }

    handleChatAdd = (chat) => {

        const { chatsAddAction, chats, redirect } = this.props;
        if (chat.title.length > 0) {
            chatsAddAction({
                ...chat,
                // id: nanoid(),
            });
            redirect(chats.length);
        }
    }

    handleChangeLocation = (url) => {
        const { redirect } = this.props;

        redirect(url);

    }

    handleChatDel = (chatId, e) => {
        const { chatDeleteAction, chats, redirect } = this.props;

        if (chatId) {
            chatDeleteAction(chatId);
            redirect(0);
        }
        e.stopPropagation();
    }

    render() {
        const { chats, currentChatId } = this.props;

        return <ChatList chats={chats}
            handleChatAdd={this.handleChatAdd}
            handleChatDel={this.handleChatDel}
            handleChangeLocation={this.handleChangeLocation}
            currentChatId={currentChatId}

        />
    }
}

function mapStateToProps(state, ownProps) {

    const chats = state.chats.entries;
    const location = state.router.location.pathname;
    let arr = location.match(/\/chats\/(\d+)/);
    let currentChatId = null;
    if (arr && arr[1]) {
        currentChatId = arr[1];
    }


    return {
        chats,
        currentChatId,
    };
}

function mapDispatchToProps(dispacth) {
    return {
        chatsLoadAction: () => dispacth(chatsLoadAction()),
        chatsAddAction: (chat) => dispacth(chatsAddAction(chat)),
        chatDeleteAction: (chatId) => dispacth(chatDeleteAction(chatId)),
        redirect: (id) => dispacth(push(`/chats/${id}`)),
    };
}

export const ChatListContainer = connect(mapStateToProps, mapDispatchToProps)(ChatListContainerClass);
