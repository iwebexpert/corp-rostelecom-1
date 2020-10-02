import { CHATS_DELETE, chatsDeleteAction } from '../actions/chats';

export const delMiddleware = store => next => action => {
    if (action.type === CHATS_DELETE) {
        store.dispatch(chatsDeleteAction);
    }
    return next(action);
};