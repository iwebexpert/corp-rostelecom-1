import React, {Component} from 'react'
import {ListItemText, MenuItem} from '@material-ui/core'
import LoopIcon from '@material-ui/icons/Loop'

export class ErrorLoadItem extends Component {

    handleReloadChats = () => {
        this.props.loadChatsAction()
    }

    render() {



        return (

            <MenuItem onClick={this.handleReloadChats}>
                <LoopIcon color="action" fontSize="large"/>
                <ListItemText className='text-new-chat'>Попробовать еще раз</ListItemText>
            </MenuItem>

        )
    }

}


