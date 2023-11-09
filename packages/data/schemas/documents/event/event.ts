import { defineType, defineField, SanityDocument, Slug } from "@sanity/types";
import { PresentationIcon } from "@sanity/icons";
import { getMediaCover, selectDefaultLocale, urlPreview } from "../../../utils";
import { Color, globalConfig } from "@cs/globals";
import {
    BodyBlock,
    CaptionAlt,
    CoverBlock,
    ElementDate,
    LineupPeople,
    LinkCaptioned,
    LocaleString
} from "../../objects";
import { MetadataPage } from "../../sections";
import { Label, swatches } from "../../system";
import { Page } from "../page";
import { Palette } from "@weresk/maket";

export interface Event extends SanityDocument {
    _type: "event" | "reference";
    _ref?: string;
    title?: LocaleString;
    subtitle?: LocaleString;
    slug: Slug;
    lineup?: LineupPeople[];
    dates?: ElementDate[];
    action?: LinkCaptioned;
    covers?: CoverBlock[];
    captionAlt?: CaptionAlt;
    body?: BodyBlock[];
    parent?: Page;
    labels?: Label[];
    palette?: Palette;
    cardSurface?: Color;
    publishDate: string;
    metadata?: MetadataPage;
}

export default function event() {
    return defineType({
        name: "event",
        title: "Event",
        type: "document",
        groups: [
            {
                name: "card",
                title: "Card"
            },
            {
                name: "event",
                title: "Event"
            },
            {
                name: "page",
                title: "Page"
            },
            {
                name: "connections",
                title: "Connections"
            },
            {
                name: "style",
                title: "Style"
            },
            {
                name: "schedule",
                title: "Schedule"
            },
            {
                name: "seo",
                title: "SEO"
            }
        ],
        fields: [
            defineField({
                name: "title",
                title: "Title",
                type: "localeString",
                group: "card"
            }),
            defineField({
                name: "subtitle",
                title: "Subtitle",
                type: "localeString",
                options: {
                    collapsible: true,
                    collapsed: true
                },
                group: "card"
            }),
            defineField({
                name: "slug",
                type: "normalizedSlug",
                validation: (Rule) => Rule.required(),
                group: "card"
            }),
            defineField({
                name: "lineup",
                title: "Lineup",
                type: "array",
                of: [{ type: "lineupPeople" }],
                group: "event"
            }),
            defineField({
                name: "dates",
                title: "Dates",
                type: "array",
                of: [{ type: "elementDate" }],
                group: "event"
            }),
            defineField({
                name: "action",
                title: "Action",
                type: "linkCaptioned",
                group: "event"
            }),
            defineField({
                name: "covers",
                title: "Covers",
                type: "coverArray",
                group: "page"
            }),
            defineField({
                name: "captionAlt",
                title: "Cover caption & alternative text",
                type: "captionAlt",
                options: {
                    collapsible: true,
                    collapsed: true
                },
                group: "page"
            }),
            defineField({
                name: "body",
                type: "bodyEvent",
                title: "Body",
                group: "page"
            }),
            defineField({
                name: "parent",
                title: "Parent page",
                type: "reference",
                description: "Set a page relavent to event",
                to: [{ type: "page" }],
                options: {
                    disableNew: true
                },
                readOnly: false,
                group: "connections"
            }),
            defineField({
                name: "labels",
                title: "Labels",
                type: "array",
                description: "Use labels for grouping, if necessarily",
                of: [
                    {
                        type: "reference",
                        title: "Label",
                        to: [{ type: "label" }]
                    }
                ],
                group: "connections"
            }),
            defineField({
                name: "palette",
                title: "Page palette",
                type: "reference",
                description: "If not set – default website palette will be used",
                to: [{ type: "palette" }],
                group: "style"
            }),
            defineField({
                name: "cardSurface",
                title: "Custom card color",
                type: "color",
                options: {
                    colorList: swatches
                },
                group: "style"
            }),
            defineField({
                name: "publishDate",
                title: "Publication date",
                type: "datetime",
                description: "Enables publication planning to certain time in the future and defines order of cards",
                initialValue: new Date().toISOString(),
                validation: (Rule) => Rule.required(),
                group: "schedule"
            }),
            defineField({
                name: "metadata",
                title: "Metadata",
                type: "metadataPage",
                group: "seo",
                options: {
                    collapsed: true
                }
            })
        ],
        preview: {
            select: {
                title: "title",
                covers: "covers",
                parent: "parent.title",
                metaCover: "metadata.sharedImage",
                slug: "slug.current"
            },
            prepare({ title, covers, parent, metaCover, slug }) {
                const localeTitle = selectDefaultLocale(title);
                const cover = getMediaCover(covers) || metaCover;
                const category = `Event${selectDefaultLocale(parent) ? "/" + selectDefaultLocale(parent) : ""}`;
                const subtitle = `${localeTitle ? category + " " : ""}${urlPreview(slug, "event")}`;
                return {
                    title: localeTitle || category,
                    subtitle: localeTitle ? subtitle : "",
                    media: cover
                };
            }
        },
        icon: PresentationIcon,
        orderings: [
            {
                title: "Title",
                name: "titleAsc",
                by: [
                    {
                        field: `title.${globalConfig.localization.default}`,
                        direction: "asc"
                    }
                ]
            },
            {
                title: "Publish date",
                name: "publishDesc",
                by: [
                    {
                        field: "publishDate",
                        direction: "desc"
                    }
                ]
            }
        ]
    });
}
