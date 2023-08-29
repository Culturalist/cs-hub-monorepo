import { defineField, defineType } from 'sanity';
import { CalendarIcon } from '@sanity/icons';
import { LocalePortableText } from './localePortableText';
import { selectDefaultLocale } from '../../utils';
import { ElementSchedule } from './elementSchedule';

export interface BlockSchedule {
    _type: 'blockSchedule';
    schedule?: ElementSchedule[];
    expandDescription?: boolean;
}

export default function blockSchedule(appName: string = 'hub') {
    return defineType({
        name: 'blockSchedule',
        title: 'Schedule',
        type: 'object',
        fields: [
            defineField({
                name: 'schedule',
                title: 'Schedule',
                type: 'array',
                of: [
                    {
                        type: 'elementSchedule'
                    }
                ]
            })
            // defineField({
            //     name: 'expandDescription',
            //     title: 'Expand description by default',
            //     type: 'boolean',
            //     initialValue: false
            // })
        ],
        preview: {
            select: {
                eventTitle: 'schedule.0.title',
                eventTime: 'schedule.0.time'
            },
            prepare({ eventTitle, eventTime }) {
                const title = `${eventTime ? `${eventTime} – ` : ''}${selectDefaultLocale(eventTitle) || ''}`;
                return {
                    title: title || 'Schedule',
                    subtitle: title ? 'Schedule' : ''
                };
            }
        },
        icon: CalendarIcon
    });
}
