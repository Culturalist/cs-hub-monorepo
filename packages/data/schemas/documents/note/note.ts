import { defineType, defineField, SanityDocument, Slug } from "@sanity/types";
import { DocumentIcon } from "@sanity/icons";
import { BodyBlock, CaptionAlt, CoverBlock, LocaleString } from "../../objects";
import { MetadataPage } from "../../sections";
import { getMediaCover, selectDefaultLocale } from "../../../utils";
import { globalConfig } from "@cs/globals";

export interface Note extends SanityDocument {
    _type: "note" | "reference";
    _ref?: string;
    title?: LocaleString;
    slug: Slug;
    date: string;
    covers?: CoverBlock[];
    captionAlt?: CaptionAlt;
    body?: BodyBlock[];
    metadata?: MetadataPage;
}

export default function note() {
    return defineType({
        name: "note",
        title: "Note",
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
                name: "slug",
                type: "normalizedSlug",
                validation: (Rule) => Rule.required(),
                group: "card"
            }),
            defineField({
                name: "date",
                title: "Date",
                type: "datetime",
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
                type: "bodyNote",
                title: "Body",
                group: "page"
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
                slug: "slug.current",
                metaCover: "metadata.sharedImage"
            },
            prepare({ title, covers, slug, metaCover }) {
                const localeTitle = selectDefaultLocale(title);
                const cover = getMediaCover(covers) || metaCover;
                const url = slug ? `/${globalConfig.routes.note}/${slug}` : "";
                return {
                    title: localeTitle || "Note",
                    subtitle: url || (localeTitle ? "Note" : ""),
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
