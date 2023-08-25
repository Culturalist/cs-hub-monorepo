import { defineType, defineField } from 'sanity';
import { ContactType, contactTypeList } from '../values';
import { LinkIcon } from '@sanity/icons';
import { capitalize } from 'weresk/utils';
import { LocaleString } from './localeString';
import { selectDefaultLocale } from '../../utils';

export interface LinkContact {
    _type: 'linkContact';
    _key: string;
    type: ContactType;
    caption?: LocaleString;
    url?: string;
}

export default function linkContact(appName: string) {
    return defineType({
        name: 'linkContact',
        title: 'Contact',
        type: 'object',
        fields: [
            {
                name: 'type',
                title: 'Type',
                type: 'string',
                initialValue: 'facebook',
                options: {
                    list: contactTypeList
                },
                validation: Rule => Rule.required()
            },
            defineField({
                name: 'caption',
                title: 'Caption',
                type: 'localeString',
                hidden: ({ parent }) => parent?.type !== 'website'
            }),
            {
                name: 'url',
                title: 'URL',
                type: 'url',
                description: `URL starts with "http://" or "https://" and email with "mailto"`,
                validation: Rule =>
                    Rule.uri({
                        scheme: ['http', 'https', 'mailto']
                    })
            }
        ],
        preview: {
            select: {
                type: 'type',
                caption: 'caption',
                url: 'url'
            },
            prepare({ type, caption, url }) {
                const localeCaption = selectDefaultLocale(caption, appName);
                return {
                    title: type == 'website' && localeCaption ? localeCaption : capitalize(type) || 'Contact',
                    subtitle: url
                };
            }
        },
        icon: LinkIcon
    });
}
