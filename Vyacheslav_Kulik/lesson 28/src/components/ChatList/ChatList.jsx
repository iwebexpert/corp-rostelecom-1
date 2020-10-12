import React, {Component} from 'react'
import {Grid, MenuList,} from '@material-ui/core'
import {ChatItemContainer as ChatItem} from 'containers/ChatItemContainer'
import {NewChatItem} from '../NewChatItem'
import {ErrorLoadItem} from '../ErrorLoadItem'
import CircularProgress from '@material-ui/core/CircularProgress'


import './ChatList.scss'

export const ChatList = (props) => {
    const {chats, currentChatId, isError, isLoading} = props
    let chatList
    if (chats) {
        chatList = chats.map(item => <ChatItem key={item.id} currentChatId={currentChatId} {...item}/>)
    }

    return (<Grid container direction="column">
        <MenuList className="chat-list">
            {isLoading && <CircularProgress className="chat-list-loading"/>}
            {isError && <ErrorLoadItem loadChatsAction={props.loadChatsAction}/>}
            {chatList}
            <NewChatItem/>
        </MenuList>
    </Grid>)

}

//
// export class ChatList extends Component {
//
//     render() {
//         const {chats, currentChatId, isError, isLoading} = this.props
//         let chatList
//         if(chats) {
//             chatList = chats.map(item => <ChatItem key={item.id} currentChatId={currentChatId} {...item}/>)
//         }
//
//         return (<Grid container direction="column">
//             <MenuList className="chat-list">
//                 {isLoading && <CircularProgress className="chat-list-loading"/>}
//                 {isError && <ErrorLoadItem loadChatsAction={this.props.loadChatsAction} />}
//                 {chatList}
//                 <NewChatItem />
//             </MenuList>
//         </Grid>)
//
//     }
//
// }
