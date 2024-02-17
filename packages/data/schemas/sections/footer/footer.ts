import { defineType, defineField } from "@sanity/types";
import { DocumentIcon } from "@sanity/icons";
import { appConfig, ImageObject } from "@cs/globals";
import type { PageDocument } from "../../documents";
import type { LinkExternal, LocalePortableText, LinkContact } from "../../objects";

export interface Footer {
    _type: "footer";
    logo?: ImageObject;
    links?: (PageDocument | LinkExternal)[];
    contacts?: LocalePortableText;
    social?: LinkContact[];
}

export default function footer() {
    return defineType({
        name: "footer",
        title: "Footer",
        type: "object",
        fields: [
            defineField({
                name: "logo",
                title: "Logo",
                type: "image",
                description: "Only SVG or PNG with transparency can be used.",
                options: {
                    accept: ".svg,.png"
                }
            }),
            defineField({
                name: "links",
                title: "Links",
                description: "Bottom navigation",
                type: "array",
                of: [
                    {
                        title: "Page",
                        type: "reference",
                        to: appConfig.schemas.navigation.map((docType) => ({
                            type: docType
                        })),
                        options: {
                            disableNew: true
                        },
                        icon: DocumentIcon
                    },
                    {
                        title: "Link",
                        type: "linkExternal"
                    }
                ]
            }),
            defineField({
                name: "contacts",
                title: "Contacts",
                type: "localePortableTextField"
            }),
            defineField({
                name: "social",
                title: "Social links",
                type: "array",
                of: [{ type: "linkContact" }]
            })
        ]
    });
}
