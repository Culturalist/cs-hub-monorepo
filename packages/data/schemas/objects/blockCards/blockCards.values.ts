export type CardsType = 'manual' | 'projects' | 'posts' | 'people' | 'events' | 'organisations';
export type CardPart = 'subtitle' | 'description' | 'contacts' | 'link';

export const cardsTypeList = [
    { title: 'Manual', value: 'manual', docType: 'manual' },
    { title: 'Projects', value: 'projects', docType: 'project' },
    { title: 'Posts', value: 'posts', docType: 'post' },
    { title: 'People', value: 'people', docType: 'person' },
    { title: 'Events', value: 'events', docType: 'event' },
    { title: 'Organisations', value: 'organisations', docType: 'organisation' }
];

export const personCardParts = [
    { title: 'Subtitle', value: 'subtitle' },
    { title: 'Description', value: 'description' },
    { title: 'Contacts', value: 'contacts' },
    { title: 'Link to page', value: 'link' }
];
