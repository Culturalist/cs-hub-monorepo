import { defineType, defineField } from "@sanity/types";
import { DocumentIcon } from "@sanity/icons";
import { appConfig, ImageObject } from "@cs/globals";
import type { PageDocument } from "../../documents";
import type { LinkCaptioned, LinkExternal } from "../../objects";

export interface Header {
    _type: "header";
    logo?: ImageObject;
    marker?: LinkCaptioned;
    links?: (PageDocument | LinkExternal)[];
}

export default function header() {
    return defineType({
        name: "header",
        title: "Header",
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
                name: "marker",
                title: "Marker",
                type: "linkCaptioned",
                description: "Optional caption with or without link (dates, open call, etc.)",
                options: {
                    collapsible: true,
                    collapsed: true
                }
            }),
            defineField({
                name: "links",
                title: "Links",
                description: "Top menu navigation",
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
            })
        ]
    });
}
