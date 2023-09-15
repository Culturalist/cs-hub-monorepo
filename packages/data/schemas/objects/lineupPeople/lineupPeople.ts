import { defineField, defineType } from '@sanity/types';
import { UsersIcon } from '@sanity/icons';
import { filterByDocumentApp, joinLocaleStrings, selectDefaultLocale } from '../../../utils';
import { DefaultSchemaProps } from 'globals';
import { Label } from '../../system';
import { Person } from '../../documents';

interface SchemaProps extends DefaultSchemaProps {}

export interface LineupPeople {
    _type: 'lineupPeople';
    _key: string;
    label?: Label;
    list?: Person[];
    includeSubtitle?: boolean;
}

export default function lineupPeople({ appName = 'hub' }: SchemaProps) {
    return defineType({
        name: 'lineupPeople',
        title: 'Lineup',
        type: 'object',
        fields: [
            defineField({
                name: 'label',
                title: 'Label',
                type: 'reference',
                description: 'Use label for grouping, if necessarily',
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
                            disableNew: true,
                            filter: ({ document }: any) => filterByDocumentApp(document)
                        }
                    }
                ]
            }),
            defineField({
                name: 'includeSubtitle',
                title: 'Include subtitle',
                type: 'boolean',
                initialValue: false
            })
        ],
        preview: {
            select: {
                label: 'label.title',
                person1: 'list.0.title',
                person2: 'list.1.title',
                person3: 'list.2.title'
            },
            prepare({ label, person1, person2, person3 }) {
                const localeLabel = selectDefaultLocale(label);
                const names = joinLocaleStrings([person1, person2, person3]);
                return {
                    title: names || 'Lineup',
                    subtitle: localeLabel
                };
            }
        },
        icon: UsersIcon
    });
}
