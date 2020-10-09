import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChatList } from 'components/ChatList';
import { chatsLoadAction } from '../actions/chats';

export const ChatListContainer = (props) => {

    const dispacth = useDispatch();
    const [isLoading, isError] = useSelector((state) => ([state.chats.loading, state.chats.error]));
    // console.log(chats);
    const chats = useSelector((state) => state.chats.entries);

    useEffect(() => {
        console.log('componentDidMount - useEffect');
        if (!chats) {
            dispacth(chatsLoadAction());
        }
        // return () => {
        //     //Замена для ComponentWillUnmount()
        // };
    }, [chats]);

    const handleReloadChats = () => {
        dispacth(chatsLoadAction());
    };

    return <ChatList chats={chats}
        handleReloadChats={handleReloadChats}
        isError={isError}
        isLoading={isLoading}
    />
};
/*class ChatListContainerClass extends Component {
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

export const ChatListContainer = connect(mapStateToProps, mapDispatchToProps)(ChatListContainerClass);*/