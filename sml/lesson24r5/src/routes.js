import { MessengerContainer as Messenger } from 'containers/MessengerContainer';
// import { ProfileContainer as ProfilePage } from 'containers/ProfileContainer';

import { HomePage } from 'pages/Home';
import { AboutPage } from 'pages/About';
import { ContactsPage } from 'pages/Contacts';
import { ProfilePage } from 'pages/Profile';
import { NotFoundPage } from 'pages/PageNotFound';

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
        path: '/profile',
        component: ProfilePage,
        exact: true,
    },
    {
        path: '/chats/:id([0-9]+)',
        component: Messenger,
        exact: true,
    },
    {
        path: '*',
        component: NotFoundPage,
        exact: false,
    }
];