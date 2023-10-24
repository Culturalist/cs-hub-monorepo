import { defineType } from "@sanity/types";
import { globalConfig } from "@cs/globals";
import { isUniqueSlug, localizeString } from "../../../utils";
import type { SanityDocument, SlugSourceContext } from "@sanity/types";
import type { LocaleString } from "../localeString";

export default function normalizedSlug() {
    const { default: defaultLocale } = globalConfig.localization;
    return defineType({
        name: "normalizedSlug",
        title: "Slug",
        type: "slug",
        description: "Unique part of the link to the page. Max length: 60 characters.",
        options: {
            source: (doc: SanityDocument, options: SlugSourceContext) => {
                if (!Array.isArray(options.parent)) {
                    const { title } = options.parent;
                    return localizeString(title as LocaleString, defaultLocale);
                }
                return "";
            },
            maxLength: 60,
            isUnique: isUniqueSlug,
            slugify: (input: string) =>
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
