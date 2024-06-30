import { defineType, defineField, SanityDocument, Slug } from "@sanity/types";
import { DocumentIcon } from "@sanity/icons";
import { BodyBlock, CaptionAlt, CoverBlock, LocaleString } from "../../objects";
import { MetadataPage } from "../../sections";
import { getMediaCover, selectDefaultLocale, urlPreview } from "../../../utils";
import { globalConfig } from "@cs/globals";
import { Palette } from "@weresk/maket";

export interface Report extends SanityDocument {
    _type: "report" | "reference";
    _ref?: string;
    _key?: string;
    title?: LocaleString;
    subtitle?: LocaleString;
    slug: Slug;
    covers?: CoverBlock[];
    captionAlt?: CaptionAlt;
    index?: boolean;
    body?: BodyBlock[];
    palette?: Palette;
    publishDate: string;
    metadata?: MetadataPage;
}

export default function report() {
    return defineType({
        name: "report",
        title: "Report",
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
                name: "index",
                title: "Page index",
                description: "Creates page index from blocks with titles and IDs",
                type: "boolean",
                initialValue: false,
                group: "page"
            }),
            defineField({
                name: "body",
                type: "bodyReport",
                title: "Body",
                group: "page"
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
                slug: "slug.current"
            },
            prepare({ title, covers, metaCover, slug }) {
                const localeTitle = selectDefaultLocale(title);
                const cover = getMediaCover(covers) || metaCover;
                const category = "Report";
                const subtitle = `${localeTitle ? category + " " : ""}${urlPreview(slug, "report")}`;
                return {
                    title: localeTitle || category,
                    subtitle,
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
