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
    mediaArray,
    blockTable,
    localeTable,
    blockChart
} from "./objects";
import { page, person, post, project, event, note, organisation, report } from "./documents";
import { header, footer, hero, metadataApp, metadataPage } from "./sections";
import { app, label, palette } from "./system";

export default function schemaTypes() {
    const variableObjects = [
        ...portableTextParents.map((blockParent) => portableText({ parent: blockParent })),
        ...portableTextParents.map((blockParent) => localePortableText({ parent: blockParent })),
        ...bodyParents.map((bodyParent) => body({ parent: bodyParent })),
        ...bodyParents.map((bodyParent) => bodySection({ parent: bodyParent })),
        ...bodyParents.map((bodyParent) => blockSection({ parent: bodyParent }))
    ];

    const objects = [
        coverArray,
        localeString,
        localeText,
        localeTable,
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
        blockTable,
        blockChart,
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
    ].map((typeClass) => typeClass());

    const sections = [header, footer, hero, metadataApp, metadataPage].map((typeClass) => typeClass());

    const documents = [page, project, event, post, person, note, organisation, report].map((typeClass) => typeClass());

    const system = [app, label, palette].map((typeClass) => typeClass());

    return [...variableObjects, ...objects, ...sections, ...documents, ...system];
}
