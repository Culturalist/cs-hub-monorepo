import globalConfig from 'globals/globalConfig';

import {
    blockId,
    blockSection,
    blockCards,
    blockLinks,
    blockColumns,
    normalizedSlug,
    portableText,
    localeString,
    localeText,
    localePortableText,
    linkTyped,
    linkContact,
    linkCaptioned,
    body,
    bodySection,
    mediaImage,
    mediaVideo,
    blockEmbed,
    cardManual,
    elementDate,
    elementSchedule,
    coverImage,
    coverVideo,
    coverArray,
    captionAlt,
    blockSchedule,
    lineupPeople,
    lineupOrganisations,
    blockMedia,
    portableTextParents,
    bodyParents,
    mediaArray
} from './objects';
import { page, person, post, project, event, note, organisation, DocumentApp } from './documents';
import { header, footer, hero, metadataApp, metadataPage } from './sections';
import { app, theme, label } from './system';
import { SchemaPluginOptions, SchemaTypeDefinition } from 'sanity';

export default function schemaTypes(appName: string = 'hub') {
    const variableObjects = [
        ...portableTextParents.map(blockParent => portableText({ parent: blockParent, appName })),
        ...portableTextParents.map(blockParent => localePortableText({ parent: blockParent, appName })),
        ...bodyParents.map(bodyParent => body({ parent: bodyParent, appName })),
        ...bodyParents.map(bodyParent => bodySection({ parent: bodyParent, appName })),
        ...bodyParents.map(bodyParent => blockSection({ parent: bodyParent, appName }))
    ];

    const objects = [
        coverArray,
        localeString,
        localeText,
        normalizedSlug,
        elementDate,
        elementSchedule,
        captionAlt,
        blockCards,
        blockColumns,
        blockEmbed,
        blockSchedule,
        blockLinks,
        blockMedia,
        blockId,
        linkTyped,
        linkCaptioned,
        linkContact,
        mediaArray,
        mediaImage,
        mediaVideo,
        coverImage,
        coverVideo,
        cardManual,
        lineupPeople,
        lineupOrganisations
    ].map(typeClass => typeClass({ appName }));

    const sections = [header, footer, hero, metadataApp, metadataPage].map(typeClass => typeClass({ appName }));

    const systemDocuments = [app, theme, label].map(typeClass => typeClass({ appName }));

    const appDocuments = [page, project, event, post, person, note, organisation].map(typeClass =>
        typeClass({ appName })
    );

    return [...variableObjects, ...objects, ...sections, ...systemDocuments, ...appDocuments];
}
