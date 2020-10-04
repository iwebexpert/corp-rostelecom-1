import React, {Component} from 'react'
import {ListItemText, MenuItem} from '@material-ui/core'
import {Link} from 'react-router-dom'

import './ChatItem.scss'

export class ChatItem extends Component {

    handleRedirect =  () => {
        this.props.redirectToChat(this.props.id)
    }

    render() {
        const {currentChatId, fired, id} = this.props

        return (
            <div onClick={this.handleRedirect} className='link'>
                <MenuItem selected={parseInt(currentChatId) === this.props.id} >
                        <img src={this.props.srcAvatar} className='avatar'/>
                    <ListItemText className='chatName'>{this.props.title}</ListItemText>
                    {fired && <div className='newMessage'>1</div>}
             </MenuItem>
            </div>
        )
    }

}


