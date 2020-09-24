import { nanoid } from "nanoid"

export const chats = [
  {
    id: 0,
    title: "Тестовый чат 1",
    messages: [
      {
        id: nanoid(8),
        author: "WebDev",
        text: "Привет!",
      },
    ],
  },
  {
    id: 1,
    title: "Рабочий чат",
    messages: [
      {
        id: nanoid(8),
        author: "WebDev",
        text: "Hi!",
      },
      {
        id: nanoid(8),
        author: "WebDev",
        text: "Проверь почту",
      },
    ],
  },
  {
    id: 2,
    title: "Друзья",
    messages: [
      {
        id: nanoid(8),
        author: "WebDev",
        text: "Привет! Что нового?",
      },
    ],
  },
  {
    id: 3,
    title: "Тестовый чат 2",
    messages: [],
  },
]
