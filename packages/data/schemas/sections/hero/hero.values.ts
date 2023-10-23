import { LinksLayout } from '../../objects';

export type HeroActionType = LinksLayout | 'cards';

export const actionTypeList = [
    { title: 'Cards', value: 'cards' },
    { title: 'Links', value: 'links' },
    { title: 'Buttons', value: 'buttons' }
];
