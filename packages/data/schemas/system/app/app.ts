import { defineType, defineField, SanityDocument } from "@sanity/types";
import { ComponentIcon } from "@sanity/icons";
import { getAppLanguageList, selectDefaultLocale } from "../../../utils";
import { BodyBlock, LocaleString } from "../../objects";
import { Footer, Header, Hero, MetadataApp } from "../../sections";
import { Palette } from "@weresk/maket";

export interface App extends SanityDocument {
    _type: "app" | "reference";
    _ref?: string;
    languages?: string[];
    title?: LocaleString;
    header?: Header;
    footer?: Footer;
    hero?: Hero;
    body?: BodyBlock[];
    palette?: Palette;
    metadata?: MetadataApp;
}

export default function app() {
    return defineType({
        name: "app",
        title: "App",
        type: "document",
        groups: [
            {
                name: "navigation",
                title: "Navigation"
            },
            {
                name: "main",
                title: "Main"
            },
            {
                name: "style",
                title: "Style"
            },
            {
                name: "seo",
                title: "SEO"
            }
        ],
        fields: [
            defineField({
                name: "title",
                title: "Website title",
                type: "localeString"
            }),
            defineField({
                name: "languages",
                title: "Active languages",
                type: "array",
                of: [{ type: "string" }],
                options: {
                    list: getAppLanguageList()
                },
                validation: (Rule) => Rule.required().min(1)
            }),
            defineField({
                name: "header",
                title: "Header",
                type: "header",
                group: "navigation"
            }),
            defineField({
                name: "footer",
                title: "Footer",
                type: "footer",
                group: "navigation"
            }),
            defineField({
                name: "hero",
                title: "Hero",
                type: "hero",
                group: "main"
            }),
            defineField({
                name: "body",
                type: "bodyApp",
                title: "Body",
                group: "main"
            }),
            defineField({
                name: "palette",
                title: "Website palette",
                type: "reference",
                to: [{ type: "palette" }],
                group: "style"
            }),
            defineField({
                name: "metadata",
                title: "Metadata",
                type: "metadataApp",
                group: "seo"
            })
        ],
        preview: {
            select: {
                title: "title"
            },
            prepare({ title }) {
                const localeTitle = selectDefaultLocale(title);
                return {
                    title: localeTitle || "App",
                    subtitle: localeTitle ? "App" : ""
                };
            }
        },
        icon: ComponentIcon,
        __experimental_omnisearch_visibility: false
    });
}
