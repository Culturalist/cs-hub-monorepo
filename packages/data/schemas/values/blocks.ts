import { CardManual } from '../objects';
import { DocumentApp } from './documents';

export const linkTypeList = [
    { title: 'Reference', value: 'reference' },
    { title: 'External', value: 'external' },
    { title: 'File', value: 'file' },
    { title: 'Anchor', value: 'anchor' },
    { title: 'Internal', value: 'internal' }
];
export type LinkType = 'reference' | 'anchor' | 'external' | 'internal' | 'file';

export const contactTypeList = [
    { title: 'Email', value: 'email' },
    { title: 'Phone', value: 'phone' },
    { title: 'Website', value: 'website' },
    { title: 'Facebook', value: 'facebook' },
    { title: 'Instagram', value: 'instagram' },
    { title: 'Twitter', value: 'twitter' },
    { title: 'Linkedin', value: 'linkedin' }
];
export type ContactType = 'website' | 'email' | 'phone' | 'facebook' | 'instagram' | 'twitter' | 'linkedin';

export type BlockParent = 'body' | 'column' | 'field';
export const portableTextParents: BlockParent[] = ['body', 'column', 'field'];
export const bodyParents: DocumentApp[] = ['page', 'person', 'post', 'project', 'event', 'note', 'app'];

export type PortableTextDefinition = 'styles' | 'lists' | 'annotations' | 'blocks';
export type PortableTextElements = Record<PortableTextDefinition, Record<BlockParent, string[]>>;

export const portableTextDefinitions: PortableTextElements = {
    styles: {
        body: ['normal', 'h3', 'h4', 'lead', 'small'],
        column: ['normal', 'h3', 'h4', 'small'],
        field: ['normal']
    },
    lists: {
        body: ['bullet', 'number'],
        column: ['bullet', 'number'],
        field: []
    },
    annotations: {
        body: ['link'],
        column: ['link'],
        field: ['link']
    },
    blocks: {
        body: ['blockMedia'],
        column: ['blockMedia'],
        field: []
    }
};

export const themeColors: string[] = [
    '#323232', //Black 900
    '#999999', //CS Grey
    '#FFFFFF', //White
    '#2C2CE3', //CS Blue
    '#3C503C', //CS Green
    '#A0C1F5' //CS Sky Blue
];

export const cardsTypeList = [
    { title: 'Manual', value: 'manual', docType: 'manual' },
    { title: 'Projects', value: 'projects', docType: 'project' },
    { title: 'Posts', value: 'posts', docType: 'post' },
    { title: 'People', value: 'people', docType: 'person' },
    { title: 'Events', value: 'events', docType: 'event' }
];
export type CardsType = 'manual' | 'projects' | 'posts' | 'people' | 'events';

export const actionTypeList = [
    { title: 'Cards', value: 'cards' },
    { title: 'Links', value: 'links' },
    { title: 'Buttons', value: 'buttons' }
];
export const linksLayoutList = [
    { title: 'List', value: 'list' },
    { title: 'Buttons', value: 'buttons' }
];
export type LinksLayout = 'list' | 'buttons' | 'links';
export type HeroActionType = LinksLayout | 'cards';

export type BodyBlockDefinition = Partial<Record<DocumentApp, string[]>>;

export const bodyBlockDefinitions: BodyBlockDefinition = {
    app: ['localePortableTextBody', 'blockColumns', 'blockLinks', 'blockCards'],
    page: ['localePortableTextBody', 'blockColumns', 'blockLinks', 'blockCards', 'blockSchedule'],
    event: ['localePortableTextBody', 'blockColumns', 'blockLinks', 'blockSchedule', 'blockCards'],
    project: ['localePortableTextBody', 'blockColumns', 'blockLinks']
};
