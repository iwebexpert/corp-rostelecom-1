import { LOCATION_CHANGE } from 'connected-react-router';

export const pathChangeMiddleware = store => next => action => {
    if (action.type === LOCATION_CHANGE) {
        console.log('LOCATION_CHANGE', new Date());
    }
    return next(action);
};