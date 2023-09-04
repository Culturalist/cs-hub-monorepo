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
                id: 'en',
                title: 'English',
                abbr: 'en'
            },
            {
                id: 'ru',
                title: 'Русский',
                abbr: 'ru'
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
                documents: ['page', 'person', 'post', 'project', 'event', 'note', 'organisation'],
                links: ['page', 'person', 'post', 'project', 'event', 'note'],
                navigation: ['page', 'project', 'event'],
                create: ['page', 'person', 'post', 'project', 'event', 'note', 'theme', 'label', 'organisation']
            }
        },
        culturaweek: {
            title: 'CulturaWeek',
            domain: 'https://culturaweek.fi/',
            schemas: {
                documents: ['page', 'event', 'person', 'organisation'],
                links: ['page', 'person', 'event'],
                navigation: ['page', 'event'],
                create: ['page', 'person', 'event', 'theme', 'label', 'organisation']
            },
            tokens: {
                registration: 'https://culturaweekconference.rsvpify.com/',
                googleTag: 'G-L5CP6G9TYB'
            }
        },
        juhlarahasto: {
            title: 'Juhlarahasto',
            domain: 'https://juhlarahasto.fi/',
            schemas: {
                documents: ['page', 'project', 'post', 'person', 'organisation', 'note'],
                links: ['page', 'person', 'project', 'post'],
                navigation: ['page', 'project'],
                create: ['page', 'person', 'project', 'post', 'theme', 'label', 'organisation', 'note']
            },
            parentDocuments: {
                project: 'projektit',
                post: 'tarinat'
            },
            tokens: {
                googleTag: ''
            }
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
        note: 'sivut',
        organisation: 'yritykset'
    },
    latestUpdate: '2023-09-01',
    organization: 'Cultura-säätiö',
    creator: 'Alexander Kalachev <alexanderkalachev.com>',
    tokens: {
        fbAppId: '1109207817140829'
    },
    debug: true
};

export default globalConfig;
