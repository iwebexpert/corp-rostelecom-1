import React, {Component} from 'react'
import {ListItemText, MenuItem} from '@material-ui/core'
import {Link} from 'react-router-dom'

import './ChatItem.scss'

export class ChatItem extends Component {



    render() {

        return (
            <Link to={`/chats/${this.props.id}`} className='link'>
                <MenuItem>
                        <img src={this.props.srcAvatar} className='avatar'/>
                    <ListItemText className='chatName'>{this.props.title}</ListItemText>
             </MenuItem>
            </Link>
        )
    }

}


