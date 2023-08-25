import globalConfig from 'globals/globalConfig';
import { defineType } from 'sanity';

export default function blockId() {
    return defineType({
        name: 'blockId',
        title: 'Block ID',
        type: 'slug',
        description: 'Can be used as an anchor link. Must be set to include block in page index.',
        options: {
            // source: (doc: any, options: any) =>
            // options?.parent?.title[globalConfig.apps[doc?.app?._ref || 'hub'].localization.default],
            maxLength: 20,
            slugify: (input: any) =>
                input
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .toLowerCase()
                    .trim()
                    .replace(/[^a-z0-9 -]/g, '')
                    .replace(/\s+/g, '-')
        }
    });
}
