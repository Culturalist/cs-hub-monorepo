import { defineField, defineType } from 'sanity';
import { selectDefaultLocale } from '../../utils';
import { UsersIcon } from '@sanity/icons';
import { LocaleString } from './localeString';
import { LinkTyped } from './linkTyped';
import { Label } from '../system';
import { Person } from '../documents';

export interface ElementLineup {
    _type: 'elementLineup';
    _key: string;
    label?: Label;
    list?: Person[];
}

export default function elementLineup(appName: string = 'hub') {
    return defineType({
        name: 'elementLineup',
        title: 'Lineup',
        type: 'object',
        fields: [
            defineField({
                name: 'label',
                title: 'Label',
                type: 'reference',
                to: [{ type: 'label' }]
            }),
            defineField({
                name: 'list',
                title: 'List',
                type: 'array',
                of: [
                    {
                        type: 'reference',
                        to: [{ type: 'person' }],
                        options: {
                            disableNew: true
                            // filter: ({ document }: any) => filterByDocumentApp(document)
                        }
                    }
                ]
            })
        ],
        preview: {
            select: {
                label: 'label.title',
                person1: 'list.0.name',
                person2: 'list.1.name',
                person3: 'list.2.name'
            },
            prepare({ label, person1, person2, person3 }) {
                const localeLabel = selectDefaultLocale(label, appName);
                let names = selectDefaultLocale(person1, appName);
                !!selectDefaultLocale(person2, appName) && (names += ', ' + selectDefaultLocale(person2, appName));
                !!selectDefaultLocale(person3, appName) && (names += ', ' + selectDefaultLocale(person3, appName));
                return {
                    title: localeLabel || 'Lineup',
                    subtitle: names || ''
                };
            }
        },
        icon: UsersIcon
    });
}
