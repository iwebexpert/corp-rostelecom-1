import { chatUnFlashAction } from 'actions/chats'

export const locationChange = store => next => action => {
  if (action.type === '@@router/LOCATION_CHANGE') {
    const path = action.payload.location.pathname
    if (!/\/chats\//.test(path)) {
      return next(action)
    }
    const pathParts = path.match(/\/chats\/(.*?)$/)
    store.dispatch(chatUnFlashAction(pathParts[1] || ''))
  }
  return next(action)
}
