import globalConfig from 'globals/globalConfig';
import dictionary from '../values/dictionary';

const initialValueTemplates = [
    {
        id: 'page-by-app',
        title: 'Page in app',
        schemaType: 'page',
        parameters: [{ name: 'appName', type: 'string' }],
        value: (params: any) => ({
            app: { _type: 'reference', _ref: params.appName }
        })
    },
    {
        id: 'note-by-app',
        title: 'Notes in app',
        schemaType: 'note',
        parameters: [{ name: 'appName', type: 'string' }],
        value: (params: any) => ({
            app: { _type: 'reference', _ref: params.appName }
        })
    },
    {
        id: 'post-by-app',
        title: 'Post in app',
        schemaType: 'post',
        parameters: [{ name: 'appName', type: 'string' }],
        value: (params: any) => ({
            app: { _type: 'reference', _ref: params.appName },
            parent: globalConfig.apps[params.appName]?.parentDocuments?.post
                ? { _type: 'reference', _ref: globalConfig.apps[params.appName]?.parentDocuments?.post }
                : undefined
        })
    },
    {
        id: 'project-by-app',
        title: 'Project in app',
        schemaType: 'project',
        parameters: [{ name: 'appName', type: 'string' }],
        value: (params: any) => ({
            app: { _type: 'reference', _ref: params.appName },
            parent: globalConfig.apps[params.appName]?.parentDocuments?.project
                ? { _type: 'reference', _ref: globalConfig.apps[params.appName]?.parentDocuments?.project }
                : undefined
        })
    },
    {
        id: 'event-by-app',
        title: 'Event in app',
        schemaType: 'event',
        parameters: [{ name: 'appName', type: 'string' }],
        value: (params: any) => ({
            app: { _type: 'reference', _ref: params.appName },
            parent: globalConfig.apps[params.appName]?.parentDocuments?.event
                ? { _type: 'reference', _ref: globalConfig.apps[params.appName]?.parentDocuments?.event }
                : undefined,
            action: {
                _type: 'linkCaptioned',
                caption: dictionary.registration,
                link: {
                    _type: 'linkTyped',
                    type: 'external',
                    href: globalConfig.apps[params.appName]?.tokens?.registration || ''
                }
            }
        })
    },
    {
        id: 'person-by-app',
        title: 'Person in app',
        schemaType: 'person',
        parameters: [{ name: 'appName', type: 'string' }],
        value: (params: any) => ({
            app: { _type: 'reference', _ref: params.appName }
        })
    },
    {
        id: 'organisation-by-app',
        title: 'Organisation in app',
        schemaType: 'organisation',
        parameters: [{ name: 'appName', type: 'string' }],
        value: (params: any) => ({
            app: { _type: 'reference', _ref: params.appName }
        })
    }
];

export default initialValueTemplates;
