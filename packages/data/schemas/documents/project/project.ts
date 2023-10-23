import { defineType, defineField, SanityDocument, Slug } from "@sanity/types";
import { PresentationIcon } from "@sanity/icons";
import { globalConfig } from "@cs/globals";
import { BodyBlock, CaptionAlt, CoverBlock, LineupOrganisations, LocaleString } from "../../objects";
import { MetadataPage } from "../../sections";
import { Label } from "../../system";
import { getMediaCover, selectDefaultLocale } from "../../../utils";
import { Page } from "../page";

export interface Project extends SanityDocument {
    _type: "project" | "reference";
    _ref?: string;
    title?: LocaleString;
    subtitle?: LocaleString;
    slug: Slug;
    date: string;
    covers?: CoverBlock[];
    captionAlt?: CaptionAlt;
    body?: BodyBlock[];
    organisations?: LineupOrganisations[];
    parent?: Page;
    labels?: Label[];
    metadata?: MetadataPage;
}

export default function project() {
    return defineType({
        name: "project",
        title: "Project",
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
                description: "Date and time  define the order of projects",
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
                type: "bodyProject",
                title: "Body",
                group: "page"
            }),
            defineField({
                name: "organisations",
                title: "Organisations",
                type: "array",
                of: [{ type: "lineupOrganisations" }],
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
                        to: [{ type: "label" }],
                        options: {
                            disableNew: false
                        }
                    }
                ],
                group: "connections"
            }),
            defineField({
                name: "parent",
                title: "Parent page",
                type: "reference",
                description: "Set a page with all projects for easier navigation",
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
                    title: localeTitle || "Project",
                    subtitle: localeTitle ? "Project" : "",
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
            }
        ]
    });
}
