import { CardManual } from '../objects';
import { DocumentAny } from './documents';

export const linkTypeList = [
    { title: 'Reference', value: 'reference' },
    { title: 'External', value: 'external' },
    { title: 'File', value: 'file' },
    { title: 'Anchor', value: 'anchor' },
    { title: 'Internal', value: 'internal' }
];
export type LinkType = 'reference' | 'anchor' | 'external' | 'internal' | 'file';

export const contactTypeList = [
    { title: 'Website', value: 'website' },
    { title: 'Email', value: 'email' },
    { title: 'Facebook', value: 'facebook' },
    { title: 'Instagram', value: 'instagram' },
    { title: 'Twitter', value: 'twitter' },
    { title: 'Linkedin', value: 'linkedin' }
];
export type ContactType = 'website' | 'email' | 'facebook' | 'instagram' | 'twitter' | 'linkedin';

export type BlockParent = 'body' | 'section' | 'column' | 'field';
export const portableTextParents: BlockParent[] = ['section', 'field'];
export const bodyParents: DocumentAny[] = ['page', 'person', 'post', 'project', 'event', 'note', 'app'];

export type PortableTextDefinition = 'styles' | 'lists' | 'annotations' | 'blocks';
export type PortableTextElements = Record<PortableTextDefinition, Record<BlockParent, string[]>>;

export const portableTextDefinitions: PortableTextElements = {
    styles: {
        body: ['normal', 'H2', 'H3', 'lead', 'small'],
        section: ['normal', 'H2', 'H3', 'lead', 'small'],
        column: ['normal', 'H3', 'small'],
        field: ['normal']
    },
    lists: {
        body: ['bullet', 'number'],
        section: ['bullet', 'number'],
        column: ['bullet', 'number'],
        field: []
    },
    annotations: {
        body: ['link'],
        section: ['link'],
        column: ['link'],
        field: ['link']
    },
    blocks: {
        body: ['blockMedia'],
        section: ['blockMedia'],
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
    { title: 'Manual', value: 'manual' },
    { title: 'Projects', value: 'projects' },
    { title: 'Posts', value: 'posts' },
    { title: 'People', value: 'people' },
    { title: 'Events', value: 'events' }
];
export type CardsType = 'manual' | 'hero' | 'projects' | 'posts' | 'people' | 'events';

export type Card = CardManual;

export const actionTypeList = [
    { title: 'Cards', value: 'cards' },
    { title: 'Links', value: 'links' },
    { title: 'Buttons', value: 'buttons' }
];
export const linksTypeList = [
    { title: 'List', value: 'list' },
    { title: 'Buttons', value: 'buttons' }
];
export type LinksLayout = 'list' | 'buttons' | 'links';
export type HeroActionType = LinksLayout | 'cards';
