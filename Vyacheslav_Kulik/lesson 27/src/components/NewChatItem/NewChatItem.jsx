import React, {Component} from 'react'
import {ListItemText, MenuItem} from '@material-ui/core'
import {Link} from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'

import './NewChatItem.scss'

export const NewChatItem = () => {
    return (
        <Link to={`/new/chats`} className='link-new-chat'>
            <MenuItem>
                <AddIcon color="action" fontSize="large" />
                <ListItemText className='text-new-chat'>Создать новый чат</ListItemText>
            </MenuItem>
        </Link>
    )
}
//
// export class NewChatItem extends Component {
//
//
//     render() {
//
//         return (
//             <Link to={`/new/chats`} className='link-new-chat'>
//                 <MenuItem>
//                     <AddIcon color="action" fontSize="large" />
//                     <ListItemText className='text-new-chat'>Создать новый чат</ListItemText>
//                 </MenuItem>
//             </Link>
//         )
//     }
//
// }


