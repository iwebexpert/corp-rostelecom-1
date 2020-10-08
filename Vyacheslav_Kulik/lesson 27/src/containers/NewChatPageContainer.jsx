import React from 'react'
import {NewChatPage} from 'components/NewChatPage'
import { addNewChatFetchAction} from 'actions/chats'
import { push } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import moment from "moment";


export const NewChatPageContainer = () => {
    const dispatch = useDispatch()
    const chats = useSelector(state => state.chats.entries)
    const getNewChatTitle =  (title) =>  {
        dispatch(addNewChatFetchAction(title))
        dispatch(push(`/chats/${chats.length}`))
    }
    return <NewChatPage getNewChatTitle={getNewChatTitle}/>
}

//
// class NewChatPageClass extends Component {
//
//     getNewChatTitle =  (title) =>  {
//         this.props.addNewChatFetchAction(title)
//         this.props.redirect(this.props.chats.entries.length) // редирект в новый чат
//     }
//
//
//     render() {
//         return <NewChatPage getNewChatTitle={this.getNewChatTitle}/>
//     }
//
// }
//
// function mapStateToProps(state, ownProps) {
//     return {
//         ...state
//     }
//
//
// }
//
// function mapDispatchToProps(dispatch) {
//     return {
//         addNewChatAction: (title) => dispatch(addNewChatAction(title)),
//         addNewChatFetchAction: (title) => dispatch(addNewChatFetchAction(title)),
//         redirect: (id) => dispatch(push(`/chats/${id}`))
//
//     }
// }
//
// export const NewChatPageContainer = connect(mapStateToProps, mapDispatchToProps)(NewChatPageClass)