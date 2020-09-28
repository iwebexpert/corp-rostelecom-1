import {ADD_CHATS, ADD_MESSAGES_CHATS}  from '../actions/chats'
import {chats} from '../helpers/chats'

const initialState = {
    entries: [],
    loading: false
}

export const chatsReducer = (state = initialState,  action) => {
    switch(action.type) {
        case ADD_CHATS:
            return {
                ...state,
                entries: chats
            }
        case ADD_MESSAGES_CHATS:
            return  {
                ...state,
                entries: []
            }
        default: return state
    }

}


