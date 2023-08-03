import { defineType } from 'sanity';

const normalizedSlug = defineType({
    name: 'normalizedSlug',
    title: 'Slug',
    type: 'slug',
    description: 'Unique part of the link to the page. Max length: 60 characters.',
    options: {
        maxLength: 60,
        slugify: (input: string) =>
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

export default normalizedSlug;
