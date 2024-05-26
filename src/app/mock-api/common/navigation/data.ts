/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id      : 'dashboards',
        title   : 'E-commerce',
        subtitle: 'Sample project',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
        {
            id   : 'project',
            title: 'Project',
            type : 'basic',
            icon : 'heroicons_outline:clipboard-document-check',
            link : '/software'
        },
        {
            id   : 'starships-list',
            title: 'Starships',
            type : 'basic',
            icon : 'heroicons_outline:rocket-launch',
            link : '/starships-list'
        },       
        {
            id   : 'cart',
            title: 'Cart',
            type : 'basic',
            icon : 'heroicons_outline:shopping-cart',
            link : '/cart'
        },
        {
            id   : 'orders',
            title: 'Orders',
            type : 'basic',
            icon : 'heroicons_outline:square-3-stack-3d',
            link : '/orders'
        },
      
        ]
    },
    {
        id      : 'me',
        title   : 'About me',
        subtitle: 'CV, skills and more',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id   : 'profile',
                title: 'Profile',
                type : 'basic',
                icon : 'heroicons_outline:user',
                link : '/profile'
            },       
            /*{
                id   : 'contact',
                title: 'Contact',
                type : 'basic',
                icon : 'heroicons_outline:envelope',
                link : '/contact'
            }*/
        ],
    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
