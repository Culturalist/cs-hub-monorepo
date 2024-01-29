import { defineType, defineField, SanityDocument, Slug } from "@sanity/types";
import { CaseIcon } from "@sanity/icons";
import { joinLocaleStrings, selectDefaultLocale } from "../../../utils";
import { globalConfig } from "@cs/globals";
import type { ImageObject } from "@cs/globals";
import type { LocaleString } from "../../objects";
import type { Label } from "../../system";
import type { Page } from "../page";

export interface Organisation extends SanityDocument {
    _type: "organisation" | "reference";
    _key: string;
    _ref?: string;
    title?: LocaleString;
    slug?: Slug;
    subtitle?: LocaleString;
    logo?: ImageObject;
    url?: string;
    labels?: Label[];
    parent?: Page;
}

export default function organisation() {
    return defineType({
        name: "organisation",
        title: "Organisation",
        type: "document",
        fields: [
            defineField({
                name: "title",
                title: "Name",
                type: "localeString"
            }),
            defineField({
                name: "slug",
                type: "normalizedSlug",
                validation: (Rule) => Rule.required()
            }),
            defineField({
                name: "subtitle",
                title: "Subtitle",
                type: "localeString"
            }),
            defineField({
                name: "logo",
                title: "Logo",
                type: "image",
                description: "Recommended files to use: .svg and .png with transparency"
            }),
            {
                name: "url",
                title: "Website URL",
                type: "url",
                description: `URL starts with "http://" or "https://""`,
                validation: (Rule) =>
                    Rule.uri({
                        scheme: ["http", "https"]
                    })
            },
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
                ]
            })
        ],
        preview: {
            select: {
                name: "title",
                logo: "logo",
                label1: "labels.0.title",
                label2: "labels.1.title",
                label3: "labels.2.title"
            },
            prepare({ name, logo, label1, label2, label3 }) {
                const localeName = selectDefaultLocale(name);
                const labels = joinLocaleStrings([label1, label2, label3]);
                return {
                    title: localeName || "organisation",
                    subtitle: localeName ? labels : "",
                    media: logo
                };
            }
        },
        icon: CaseIcon,
        orderings: [
            {
                title: "Name",
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
