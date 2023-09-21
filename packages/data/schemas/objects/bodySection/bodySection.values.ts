import { DocumentApp } from 'globals';

export type BodyBlockDefinition = Partial<Record<DocumentApp, string[]>>;

export const bodyBlockDefinitions: BodyBlockDefinition = {
    app: ['localePortableTextBody', 'blockColumns', 'blockMedia', 'blockLinks', 'blockCards'],
    page: ['localePortableTextBody', 'blockColumns', 'blockMedia', 'blockLinks', 'blockCards'],
    event: ['localePortableTextBody', 'blockColumns', 'blockMedia', 'blockLinks', 'blockCards', 'blockSchedule'],
    project: ['localePortableTextBody', 'blockColumns', 'blockMedia', 'blockLinks', 'blockCards']
};
