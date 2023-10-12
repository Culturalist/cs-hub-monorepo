import { AppConfig } from './types';

export const appName = process.env.NEXT_PUBLIC_APP_NAME || process.env.SANITY_STUDIO_APP_NAME || 'template';

export const appsConfig: Record<string, AppConfig> = {
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
            documents: ['page', 'post', 'person', 'organisation', 'note'],
            links: ['page', 'person', 'post'],
            navigation: ['page'],
            create: ['page', 'person', 'post', 'theme', 'label', 'organisation', 'note']
        },
        parentDocuments: {
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
        }
    }
};

export const appConfig = appsConfig[appName];
