import { appConfig, ImageObject } from "@cs/globals";
import { defineType, defineField } from "@sanity/types";
import { PageDocument } from "../../documents";
import { LinkContact } from "../../objects/linkContact";
import { LocalePortableText } from "../../objects/localePortableText";

export interface Footer {
    _type: "footer";
    logo?: ImageObject;
    links?: PageDocument[];
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
                        type: "reference",
                        to: appConfig.schemas.navigation.map((docType) => ({
                            type: docType
                        })),
                        options: {
                            disableNew: true
                        }
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
