import { MessengerContainer as Messenger } from "containers/MessengerContainer"
import { ProfileContainer as Profile } from "containers/ProfileContainer"
import Error from "./pages/Error"

export const routes = [
  {
    path: "/",
    component: Messenger,
    exact: true,
  },
  {
    path: "/profile",
    component: Profile,
    exact: true,
  },
  {
    path: "/chats/:id([0-9]+)",
    component: Messenger,
    exact: true,
  },
  {
    path: "*",
    component: Error,
    exact: false,
  },
]
