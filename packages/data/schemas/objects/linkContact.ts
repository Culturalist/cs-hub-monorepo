import { defineType } from 'sanity';
import { contactTypeList } from '../values';
import { LinkIcon } from '@sanity/icons';
import { capitalize } from 'weresk/utils';

export default function linkContact() {
    return defineType({
        name: 'linkContact',
        title: 'Contact',
        type: 'object',
        fields: [
            {
                name: 'type',
                title: 'Type',
                type: 'string',
                initialValue: 'website',
                options: {
                    list: contactTypeList
                },
                validation: Rule => Rule.required()
            },
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
                url: 'url'
            },
            prepare({ type, url }) {
                return {
                    title: type ? capitalize(type) : 'Contact',
                    subtitle: url
                };
            }
        },
        icon: LinkIcon
    });
}
