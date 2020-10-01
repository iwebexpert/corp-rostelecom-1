import { Messenger } from 'components/Messenger';

import { HomePage } from 'pages/Home';
import { AboutPage } from 'pages/About';
import { ContactsPage } from 'pages/Contacts';
import { NotFoundPage } from 'pages/PageNotFound';
import { ProfileContainer as Profile } from 'containers/ProfileContainer';

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
        component: Profile,
        exact: true,
    },
    {
        path: '*',
        component: NotFoundPage,
        exact: false,
    }
];