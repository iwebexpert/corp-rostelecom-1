import { MessengerContainer as Messenger } from 'containers/MessengerContainer';

import { HomePage } from 'pages/Home';
import { AboutPage } from 'pages/About';
import { ContactsPage } from 'pages/Contacts';
import { NotFoundPage } from 'pages/PageNotFound';
import { ProfileContainer } from 'containers/ProfileContainer';

export const routes = [
    {
        path: '/',
        component: HomePage,
        exact: true,
    },
    {
        path: '/about',
        component: AboutPage,
        exact: true,
    },
    {
        path: '/contacts',
        component: ContactsPage,
        exact: true,
    },
    {
        path: '/chats/:id([0-9]+)',
        component: Messenger,
        exact: true,
    },
    {
        path: '/profile',
        component: ProfileContainer,
        exact: true,
    },
    {
        path: '*',
        component: NotFoundPage,
        exact: false,
    }
];