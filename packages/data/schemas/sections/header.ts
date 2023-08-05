import globalConfig from 'globals/globalConfig';
import { defineField, defineType } from 'sanity';
import { filterByDocumentApp, getAppLanguageList } from '../../utils';

export default function header(appName: string = 'hub') {
    return defineType({
        name: 'header',
        title: 'Header',
        type: 'object',
        fields: [
            defineField({
                name: 'logo',
                title: 'Logo',
                type: 'image',
                description: 'Only SVG or PNG with transparency can be used.',
                options: {
                    accept: '.svg,.png'
                }
            }),
            defineField({
                name: 'links',
                title: 'Links',
                description: 'Top menu navigation',
                type: 'array',
                of: [
                    {
                        type: 'reference',
                        to: globalConfig.apps[appName].schemas.navigation.map(docType => ({ type: docType })),
                        options: {
                            disableNew: true,
                            filter: ({ document }: any) => filterByDocumentApp(document)
                        }
                    }
                ]
            }),
            defineField({
                name: 'languages',
                title: 'Active languages',
                description:
                    'Turning off one of the languages prevent user from manually selecting it in the menu, but pages of this language will still be created and accessible by link.',
                type: 'array',
                of: [{ type: 'string' }],
                options: {
                    // layout: 'grid',
                    list: getAppLanguageList(appName)
                }
            })
        ]
    });
}
