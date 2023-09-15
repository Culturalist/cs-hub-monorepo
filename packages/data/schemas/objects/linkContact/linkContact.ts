import { defineType, defineField } from '@sanity/types';
import { ContactType, contactTypeList } from './linkContact.values';
import { LinkIcon } from '@sanity/icons';
import { capitalize } from 'globals/utils';
import { LocaleString } from '../localeString';
import { selectDefaultLocale } from '../../../utils';
import { DefaultSchemaProps } from 'globals';

interface SchemaProps extends DefaultSchemaProps {}

export interface LinkContact {
    _type: 'linkContact';
    _key: string;
    type: ContactType;
    caption?: LocaleString;
    phone?: string;
    url?: string;
}

export default function linkContact({ appName = 'hub' }: SchemaProps) {
    return defineType({
        name: 'linkContact',
        title: 'Contact',
        type: 'object',
        fields: [
            {
                name: 'type',
                title: 'Type',
                type: 'string',
                initialValue: 'email',
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
            defineField({
                name: 'phone',
                title: 'Phone number',
                type: 'string',
                hidden: ({ parent }) => parent?.type !== 'phone'
            }),
            {
                name: 'url',
                title: 'URL',
                type: 'url',
                description: `URL starts with "http://" or "https://" and email with "mailto"`,
                validation: Rule =>
                    Rule.uri({
                        scheme: ['http', 'https', 'mailto']
                    }),
                hidden: ({ parent }) => parent?.type == 'phone'
            }
        ],
        preview: {
            select: {
                type: 'type',
                caption: 'caption',
                url: 'url',
                phone: 'phone'
            },
            prepare({ type, caption, url, phone }) {
                const localeCaption = selectDefaultLocale(caption);
                return {
                    title: type == 'website' && localeCaption ? localeCaption : capitalize(type) || 'Contact',
                    subtitle: type == 'phone' ? phone : url
                };
            }
        },
        icon: LinkIcon
    });
}
