import { messages } from 'helpers/messagesData'

export const chats = [
  {
    id: 'first',
    name: 'Chat 1',
    users: [1, 2, 3],
    messages: [...messages.filter((i, idx) => idx < 3).map(i => i.id)]
  },
  {
    id: 'second',
    name: 'Chat 2',
    users: [1],
    messages: [...messages.filter((i, idx) => idx >= 3).map(i => i.id)]
  },
  {
    id: 'third',
    name: 'Chat 3',
    users: [1],
    messages: []
  }
]
