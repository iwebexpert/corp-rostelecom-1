import React, {Component} from 'react'
import {Grid, MenuList, } from '@material-ui/core'
import {ChatItem} from '../ChatItem'
import {NewChatItem} from '../NewChatItem'


import './ChatList.scss'

export class ChatList extends Component {

    render() {
        let chatList
        if(this.props.chats) {
            chatList = this.props.chats.map(item => <ChatItem key={item.id} {...item}/>)
        }

        return (<Grid container direction="column">
            <MenuList className="chat-list">
                {chatList}
                <NewChatItem />
            </MenuList>
        </Grid>)

    }

}
