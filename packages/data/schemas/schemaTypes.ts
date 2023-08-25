import globalConfig from 'globals/globalConfig';
import { bodyParents, DocumentAny, DocumentApp, mediaParents, portableTextParents } from './values';

import {
    blockId,
    blockSection,
    blockCards,
    blockLinks,
    normalizedSlug,
    portableText,
    localeString,
    localeText,
    localePortableText,
    linkTyped,
    linkContact,
    linkCaptioned,
    body,
    mediaArray,
    mediaImage,
    mediaVideo,
    mediaEmbed,
    cardManual,
    elementLineup,
    elementDate,
    coverImage,
    coverVideo,
    coverArray,
    captonAlt
} from './objects';
import { page, person, post, project, event, note } from './documents';
import { header, footer, hero, metadataApp, metadataPage } from './sections';
import { app, theme, label } from './system';
import bodySection from './objects/bodySection';

export default function schemaTypes(appName: string = 'hub') {
    const globalObjects = [
        ...portableTextParents.map(blockParent => portableText(blockParent)),
        ...portableTextParents.map(blockParent => localePortableText(blockParent)),
        ...bodyParents.map(bodyParent => body(bodyParent)),
        ...bodyParents.map(bodyParent => bodySection(bodyParent)),
        ...bodyParents.map(bodyParent => blockSection(bodyParent, appName)),
        ...mediaParents.map(mediaParent => mediaArray(mediaParent)),
        coverArray(),
        localeString(),
        localeText(),
        normalizedSlug(),
        metadataApp(),
        metadataPage(),
        blockId(),
        hero(),
        elementDate(),
        captonAlt()
    ];

    const appObjects = [
        blockCards,
        blockLinks,
        linkTyped,
        linkCaptioned,
        linkContact,
        header,
        footer,
        mediaImage,
        mediaVideo,
        mediaEmbed,
        coverImage,
        coverVideo,
        cardManual,
        elementLineup
    ].map(typeClass => typeClass(appName));

    const systemDocuments = [app(), theme(), label(appName)];

    const allDocuments: Partial<Record<DocumentApp, Function>> = {
        page,
        project,
        event,
        post,
        person,
        note
    };

    const appDocuments = globalConfig.apps[appName].schemas.documents.map(documentType => {
        const typeObject = allDocuments[documentType];
        if (typeObject) return typeObject(appName);
    });

    return [...globalObjects, ...appObjects, ...systemDocuments, ...appDocuments];
}
