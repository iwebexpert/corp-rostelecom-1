import React, {Component} from 'react'
import {Avatar, ListItemAvatar, ListItemText, MenuItem} from '@material-ui/core'
import {Link} from 'react-router-dom'

export class ChatItem extends Component {

    render() {

        return (
            <Link to={`/chats/${this.props.id}`} >
                <MenuItem>
                    <ListItemAvatar>    
                        <Avatar src={this.props.srcAvatar}/>
                    </ListItemAvatar >
                    <ListItemText>{this.props.title}</ListItemText>
             </MenuItem>
            </Link>
        )
    }

}
