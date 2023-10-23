import { defineType, defineField, SanityDocument, Slug } from "@sanity/types";
import { DocumentIcon } from "@sanity/icons";
import { globalConfig } from "@cs/globals";
import { BodyBlock, CaptionAlt, CoverBlock, LocaleString } from "../../objects";
import { MetadataPage } from "../../sections";
import { Label } from "../../system";
import { getMediaCover, selectDefaultLocale } from "../../../utils";
import { Person } from "../person";
import { Page } from "../page";

export interface Post extends SanityDocument {
    _type: "post" | "reference";
    _ref?: string;
    title?: LocaleString;
    subtitle?: LocaleString;
    slug: Slug;
    date: string;
    covers?: CoverBlock[];
    captionAlt?: CaptionAlt;
    body?: BodyBlock[];
    author?: Person;
    parent?: Page;
    labels?: Label[];
    metadata?: MetadataPage;
}

export default function post() {
    return defineType({
        name: "post",
        title: "Post",
        type: "document",
        groups: [
            {
                name: "card",
                title: "Card"
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
                name: "date",
                title: "Date",
                type: "datetime",
                description: "Date and time  define the order of posts",
                initialValue: new Date().toISOString(),
                validation: (Rule) => Rule.required(),
                group: "card"
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
                type: "bodyPost",
                title: "Body",
                group: "page"
            }),
            defineField({
                name: "author",
                title: "Author",
                type: "reference",
                to: [{ type: "person" }],
                options: {
                    disableNew: true
                },
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
                name: "parent",
                title: "Parent page",
                type: "reference",
                description: "Set a page with all posts for easier navigation",
                to: [{ type: "page" }],
                options: {
                    disableNew: true
                },
                readOnly: false,
                group: "connections"
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
                metaCover: "metadata.sharedImage"
            },
            prepare({ title, covers, metaCover }) {
                const localeTitle = selectDefaultLocale(title);
                const cover = getMediaCover(covers) || metaCover;
                return {
                    title: localeTitle || "Post",
                    subtitle: localeTitle ? "Post" : "",
                    media: cover
                };
            }
        },
        icon: DocumentIcon,
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
            }
        ]
    });
}
