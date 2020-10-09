// export function loggerMiddleware(store){
//     return function wrapDispatch(next){
//         return function dispatch(action){
//             console.group('----------- Logger -----------');
//             console.log('Action', action);
//             console.log('State before', store.getState());
//             const result = next(action);
//             console.log('State after', store.getState());
//             console.log('Result', result);
//             console.groupEnd('----------- Logger end -----------');

//             return result;
//         }
//     }
// }

export const loggerMiddleware = store => next => action => {
    console.group('loggerMiddleware', '----------- Logger -----------');
    console.log('Action', action);
    console.log('State before', store.getState());
    const result = next(action);
    console.log('State after', store.getState());
    console.log('Result', result);
    console.groupEnd('----------- Logger end -----------');
    return result;
};