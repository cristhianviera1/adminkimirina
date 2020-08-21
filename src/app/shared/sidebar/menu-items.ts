import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    {
        path: '',
        title: 'Administrador',
        icon: '',
        class: 'nav-small-cap',
        label: '',
        labelClass: '',
        extralink: true,
        submenu: []
    },
    {
        path: '/component/users',
        title: 'Usuarios',
        icon: 'mdi mdi-account-box',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
    },
    {
        path: '/component/products',
        title: 'Productos',
        icon: 'mdi mdi-cart',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
    },
    {
        path: '/component/news',
        title: 'Noticias',
        icon: 'mdi mdi-newspaper',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
    },
    {
        path: '/component/forms',
        title: 'Encuestas',
        icon: 'mdi mdi-book-open',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
    }
];
