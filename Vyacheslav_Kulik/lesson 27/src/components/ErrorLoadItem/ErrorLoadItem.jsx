import React from 'react'
import {ListItemText, MenuItem} from '@material-ui/core'
import LoopIcon from '@material-ui/icons/Loop'
import {useDispatch} from 'react-redux'

export const ErrorLoadItem = (props) => {

    const dispatch = useDispatch()
    const handleReloadChats = () => {
        dispatch(props.loadChatsAction())
    }
    return (
            <MenuItem onClick={handleReloadChats}>
                <LoopIcon color="action" fontSize="large"/>
                <ListItemText className='text-new-chat'>Попробовать еще раз</ListItemText>
            </MenuItem>

        )

}
//
// export class ErrorLoadItem extends Component {
//
//     handleReloadChats = () => {
//         this.props.loadChatsAction()
//     }
//
//     render() {
//
//
//
//         return (
//
//             <MenuItem onClick={this.handleReloadChats}>
//                 <LoopIcon color="action" fontSize="large"/>
//                 <ListItemText className='text-new-chat'>Попробовать еще раз</ListItemText>
//             </MenuItem>
//
//         )
//     }
//
// }


