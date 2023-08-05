import globalConfig from 'globals/globalConfig';
import { bodyParents, DocumentApp, portableTextParents } from './values';

import {
    blockId,
    blockSection,
    normalizedSlug,
    metadataApp,
    metadataPage,
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
    cardManual
} from './objects';
import { page, person } from './documents';
import { header, footer, hero } from './sections';
import { app, theme } from './system';

export default function schemaTypes(appName: string = 'hub') {
    const globalObjects = [
        ...portableTextParents.map(blockParent => portableText(blockParent)),
        ...portableTextParents.map(blockParent => localePortableText(blockParent)),
        ...bodyParents.map(bodyParent => body(bodyParent)),
        localeString(),
        localeText(),
        linkContact(),
        normalizedSlug(),
        metadataApp(),
        metadataPage(),
        blockId(),
        blockSection(),
        mediaArray(),
        hero()
    ];

    const appObjects = [linkTyped, linkCaptioned, header, footer, mediaImage, mediaVideo, mediaEmbed, cardManual].map(
        typeClass => typeClass(appName)
    );

    const systemDocuments = [app(), theme()];

    const allDocuments: Record<DocumentApp, Function> = {
        page,
        person
    };

    const appDocuments = globalConfig.apps[appName].schemas.documents.map(documentType =>
        allDocuments[documentType](appName)
    );

    return [...globalObjects, ...appObjects, ...systemDocuments, ...appDocuments];
}
