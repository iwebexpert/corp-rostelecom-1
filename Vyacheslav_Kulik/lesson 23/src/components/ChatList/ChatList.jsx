import React, {Component} from 'react'
import {Grid, MenuList, } from '@material-ui/core'
import {ChatItem} from '../ChatItem'

export class ChatList extends Component {

    state = {
        chats: null
    }

    componentDidUpdate() {
        if(!this.state.chats){
            this.setState({
                chats: this.props.chats 
            })
        }
    }


    render() {
        let chatList
        if(this.state.chats) {
            chatList = this.state.chats.map(item => <ChatItem key={item.id} {...item}/>) 
        }

        return (<Grid container direction="column">
            <MenuList>
                {chatList}
            </MenuList>
        </Grid>)

    }

}
