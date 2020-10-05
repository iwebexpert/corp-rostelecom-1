import { nanoid } from "nanoid"

export const chats = [
  {
    id: 0,
    title: "Тестовый чат 1",
    fire: false,
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
    fire: false,
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
    fire: false,
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
    fire: false,
    messages: [],
  },
]
