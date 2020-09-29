import { Messenger } from 'components/Messenger';

import { HomePage } from 'pages/Home';
import { AboutPage } from 'pages/About';
import { ContactsPage } from 'pages/Contacts';
import { NotFoundPage } from 'pages/PageNotFound';
import { ProfilePage } from 'pages/Profile';

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
        path: '/chats/:id',
        component: Messenger,
        exact: true,
    },
    {
        path: '*',
        component: NotFoundPage,
        exact: false,
    }
];
