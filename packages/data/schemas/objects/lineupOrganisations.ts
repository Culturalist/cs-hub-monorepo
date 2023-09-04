import { defineField, defineType } from 'sanity';
import { filterByDocumentApp, joinLocaleStrings, selectDefaultLocale } from '../../utils';
import { CaseIcon } from '@sanity/icons';
import { Label } from '../system';
import { Organisation } from '../documents';

export interface LineupOrganisations {
    _type: 'lineupOrganisations';
    _key: string;
    label?: Label;
    list?: Organisation[];
    includeSubtitle?: boolean;
}

export default function lineupOrganisations(appName: string = 'hub') {
    return defineType({
        name: 'lineupOrganisations',
        title: 'Organisations',
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
                        to: [{ type: 'organisation' }],
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
                    title: names || 'Ogranisations',
                    subtitle: localeLabel
                };
            }
        },
        icon: CaseIcon
    });
}
