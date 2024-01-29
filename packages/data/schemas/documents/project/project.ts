import { defineType, defineField, SanityDocument, Slug } from "@sanity/types";
import { PresentationIcon } from "@sanity/icons";
import { appDesk, globalConfig } from "@cs/globals";
import { BodyBlock, CaptionAlt, CoverBlock, LineupOrganisations, LocaleString } from "../../objects";
import { MetadataPage } from "../../sections";
import { Label } from "../../system";
import { getMediaCover, selectDefaultLocale, urlPreview } from "../../../utils";
import { Page } from "../page";

export interface Project extends SanityDocument {
    _type: "project" | "reference";
    _ref?: string;
    title?: LocaleString;
    subtitle?: LocaleString;
    slug: Slug;
    covers?: CoverBlock[];
    captionAlt?: CaptionAlt;
    body?: BodyBlock[];
    // organisations?: LineupOrganisations[];
    parent?: Page;
    labels?: Label[];
    publishDate: string;
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
            // defineField({
            //     name: "organisations",
            //     title: "Organisations",
            //     type: "array",
            //     of: [{ type: "lineupOrganisations" }],
            //     group: "connections"
            // }),
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
                readOnly: Boolean(appDesk.project?.length),
                group: "connections"
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
                metaCover: "metadata.sharedImage",
                parent: "parent.title",
                slug: "slug.current"
            },
            prepare({ title, covers, metaCover, parent, slug }) {
                const localeTitle = selectDefaultLocale(title);
                const cover = getMediaCover(covers) || metaCover;
                const category = `Project${selectDefaultLocale(parent) ? "/" + selectDefaultLocale(parent) : ""}`;
                const subtitle = `${localeTitle ? category + " " : ""}${urlPreview(slug, "project")}`;
                return {
                    title: localeTitle || category,
                    subtitle,
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
