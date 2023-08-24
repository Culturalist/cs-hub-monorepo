import { GlobalConfig } from './types';

const globalConfig: GlobalConfig = {
    localization: {
        languages: [
            {
                id: 'fi',
                title: 'Suomi',
                abbr: 'su'
            },
            {
                id: 'ru',
                title: 'Русский',
                abbr: 'ru'
            },
            {
                id: 'en',
                title: 'English',
                abbr: 'en'
            }
        ],
        default: 'en'
    },
    apps: {
        hub: {
            title: 'Cultura-säätiö Hub',
            domain: 'https://hub.culturas.fi',
            localization: {
                languages: ['fi', 'en', 'ru'],
                default: 'fi'
            },
            schemas: {
                documents: ['page', 'person', 'post', 'project', 'event', 'note'],
                links: ['page', 'person', 'post', 'project', 'event', 'note'],
                navigation: ['page', 'project', 'event'],
                create: ['page', 'person', 'post', 'project', 'event', 'note', 'theme', 'label']
            }
        },
        culturaweek: {
            title: 'CulturaWeek',
            domain: 'https://culturaweek.fi',
            localization: {
                languages: ['fi', 'ru', 'en'],
                default: 'fi'
            },
            schemas: {
                documents: ['page', 'person', 'event'],
                links: ['page', 'person', 'event'],
                navigation: ['page', 'event'],
                create: ['page', 'person', 'event', 'theme', 'label']
            }
        },
        template: {
            title: 'Cultura-säätiö Website',
            domain: 'https://template.culturas.fi',
            localization: {
                languages: ['fi', 'ru', 'en'],
                default: 'fi'
            },
            schemas: {
                documents: ['page', 'person', 'post', 'project', 'event', 'note'],
                links: ['page', 'person', 'post', 'project', 'event', 'note'],
                navigation: ['page', 'project', 'event'],
                create: ['page', 'person', 'post', 'project', 'event', 'note', 'theme', 'label']
            },
            parentDocuments: {
                post: 'a3ea64e2-9845-45e1-a558-872ecd5d43ca',
                project: '47caba4a-434e-48df-be7b-b548c6be36da'
            }
        }
    },
    routes: {
        page: '',
        person: 'person',
        post: 'post',
        project: 'project',
        event: 'event',
        note: 'note'
    },
    breakpoints: {
        xs: 512,
        sm: 796,
        md: 984,
        lg: 1268
    },
    metrics: {
        unit: 4,
        offset: 20,
        xs: {
            module: 32,
            gutter: 8
        },
        sm: {
            module: 20,
            gutter: 12
        },
        md: {
            module: 24,
            gutter: 16
        },
        lg: {
            module: 32,
            gutter: 20
        }
    },
    latestUpdate: '2023-08-01',
    organization: 'Cultura-säätiö',
    creator: 'Alexander Kalachev <alexanderkalachev.com>',
    debug: true
};

export default globalConfig;
