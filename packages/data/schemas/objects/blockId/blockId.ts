import { SlugSourceContext, defineType } from "@sanity/types";
import { globalConfig } from "@cs/globals";
import { localizeString } from "../../../utils";
import type { SanityDocument } from "@sanity/types";
import type { LocaleString } from "../localeString";

export default function blockId() {
    const { default: defaultLocale } = globalConfig.localization;
    return defineType({
        name: "blockId",
        title: "Block ID",
        type: "slug",
        description: "Can be used as an anchor link. Must be set to include block in page index.",
        options: {
            source: (doc: SanityDocument, options: SlugSourceContext) => {
                if (!Array.isArray(options.parent)) {
                    const { title, indexTitle } = options.parent;
                    return (
                        localizeString(indexTitle as LocaleString, defaultLocale) ||
                        localizeString(title as LocaleString, defaultLocale)
                    );
                }
                return "";
            },
            maxLength: 20,
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
