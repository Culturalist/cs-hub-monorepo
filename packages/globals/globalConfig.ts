import { GlobalConfig, Locale } from './types';

const globalConfig: GlobalConfig = {
    localization: {
        languages: [
            {
                id: 'su',
                title: 'Suomi'
            },
            {
                id: 'ru',
                title: 'Русский'
            },
            {
                id: 'en',
                title: 'English'
            }
        ],
        default: 'en'
    },
    apps: {
        template: {
            title: 'Cultura-säätiö Website',
            domain: 'https://template.culturas.fi',
            localization: {
                languages: ['su', 'ru', 'en'],
                default: 'su'
            },
            schemas: {
                documents: ['page', 'person'],
                links: ['page', 'person'],
                navigation: ['page']
            }
        },
        hub: {
            title: 'Cultura-säätiö Hub',
            domain: 'https://hub.culturas.fi',
            localization: {
                languages: ['su', 'en', 'ru'],
                default: 'en'
            },
            schemas: {
                documents: ['page', 'person'],
                links: ['page', 'person'],
                navigation: ['page']
            }
        },
        culturaweek: {
            title: 'CulturaWeek',
            domain: 'https://culturaweek.fi',
            localization: {
                languages: ['su', 'en'],
                default: 'su'
            },
            schemas: {
                documents: ['page', 'person'],
                links: ['page', 'person'],
                navigation: ['page']
            }
        }
    },
    latestUpdate: '2023-08-01',
    creator: 'Alexander Kalachev <alexanderkalachev.com>'
};

export default globalConfig;
