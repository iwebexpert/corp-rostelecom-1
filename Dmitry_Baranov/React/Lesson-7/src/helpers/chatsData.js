import { nanoid } from "nanoid"

export const chats = [
    {
        id: 0,
        title: "Тестовый чат 1",
        fire: "unfire",
        messages: [
            {
                id: nanoid(),
                author: "WebDev",
                text: "Привет!"
            }
        ],

    },
    {
        id: 1,
        title: "Рабочий чат",
        fire: "unfire",
        messages: [
            {
                id: nanoid(),
                author: "WebDev",
                text: "Hi!"
            },
            {
                id: nanoid(),
                author: "WebDev",
                text: "Проверь почту"
            }
        ],

    },
    {
        id: 2,
        title: "Друзья",
        fire: "unfire",
        messages: [
            {
                id: nanoid(),
                author: "WebDev",
                text: "Привет! Что нового?"
            }
        ],

    }
];