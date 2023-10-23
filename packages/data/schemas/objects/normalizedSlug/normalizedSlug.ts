import { defineType } from "@sanity/types";
import { globalConfig } from "@cs/globals";
import { isUniqueSlug } from "../../../utils";

export default function normalizedSlug() {
    return defineType({
        name: "normalizedSlug",
        title: "Slug",
        type: "slug",
        description:
            "Unique part of the link to the page. Max length: 60 characters.",
        options: {
            source: (doc: any, options: any) =>
                options?.parent?.title?.[globalConfig.localization.default],
            maxLength: 60,
            isUnique: isUniqueSlug,
            slugify: (input: any) =>
                input
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                    .trim()
                    .replace(/[^a-z0-9 -]/g, "")
                    .replace(/\s+/g, "-")
        }
    });
}
