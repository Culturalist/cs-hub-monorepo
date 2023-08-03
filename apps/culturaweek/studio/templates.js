export const templates = [
    {
        id: 'page-by-channel',
        title: 'Page in channel',
        schemaType: 'page',
        parameters: [{ name: 'channelId', type: 'string' }],
        value: params => ({
            channel: { _type: 'reference', _ref: params.channelId }
        })
    },
    {
        id: 'article-by-channel',
        title: 'Article in channel',
        schemaType: 'article',
        parameters: [{ name: 'channelId', type: 'string' }],
        value: params => ({
            channel: { _type: 'reference', _ref: params.channelId }
        })
    },
    {
        id: 'collection-by-channel',
        title: 'Collection in channel',
        schemaType: 'collection',
        parameters: [{ name: 'channelId', type: 'string' }],
        value: params => ({
            channel: { _type: 'reference', _ref: params.channelId }
        })
    },
    {
        id: 'subject-by-class',
        title: 'Subject by class',
        schemaType: 'subject',
        parameters: [{ name: 'classId', type: 'string' }],
        value: params => ({
            subjectClass: { _type: 'reference', _ref: params.classId }
        })
    },
    {
        id: 'relation-by-class',
        title: 'Relation by class',
        schemaType: 'relation',
        parameters: [{ name: 'classId', type: 'string' }],
        value: params => ({
            subjectClasses: [{ _type: 'reference', _ref: params.classId }]
        })
    }
];
