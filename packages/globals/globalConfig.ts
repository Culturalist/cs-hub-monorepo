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
        default: 'fi',
        safeReplace: true
    },
    apps: {
        hub: {
            title: 'Cultura-säätiö Hub',
            domain: 'https://hub.culturas.fi/',
            schemas: {
                documents: ['page', 'person', 'post', 'project', 'event', 'note'],
                links: ['page', 'person', 'post', 'project', 'event', 'note'],
                navigation: ['page', 'project', 'event'],
                create: ['page', 'person', 'post', 'project', 'event', 'note', 'theme', 'label']
            }
        },
        culturaweek: {
            title: 'CulturaWeek',
            domain: 'https://culturaweek.fi/',
            schemas: {
                documents: ['page', 'person', 'event'],
                links: ['page', 'person', 'event'],
                navigation: ['page', 'event'],
                create: ['page', 'person', 'event', 'theme', 'label']
            },
            externalLinks: {
                registration: 'https://culturaweekconference.rsvpify.com/'
            },
            googleTag: 'G-L5CP6G9TYB'
        },
        template: {
            title: 'Cultura-säätiö Website',
            domain: 'https://template.culturas.fi/',
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
        app: '',
        page: '',
        person: 'ihmiset',
        post: 'blogit',
        project: 'projektit',
        event: 'tapahtumat',
        note: 'sivut'
    },
    breakpoints: {
        xs: 512,
        sm: 796,
        md: 984,
        lg: 1268
    },
    pd: {
        xs: 3,
        sm: 2,
        md: 2,
        lg: 2
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
    fbAppId: '1109207817140829',
    debug: false
};

export default globalConfig;
