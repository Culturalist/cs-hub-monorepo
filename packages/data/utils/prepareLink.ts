import { globalConfig, DocumentApp, Locale, routes } from "@cs/globals";
import { LinkTyped, PageDocument } from "../schemas";

export function prepareLink(input: LinkTyped, lang?: Locale): string {
    const { type, anchor, href, internal, reference, file } = input;
    let link = "";
    if ((!type || type === "external") && href) {
        link = href;
    } else if (type === "anchor" && anchor) {
        link = anchor.startsWith("#") ? anchor : `#${anchor}`;
    } else if (type === "file") {
        link = file?.url || file?.asset?.url || link;
    } else if (type === "internal" && internal) {
        link =
            internal.startsWith("/") || internal.startsWith("?") || internal.startsWith("#")
                ? internal
                : `/${internal}`;
        link = lang && internal.startsWith("/") ? `/${lang}${link}` : link;
    } else if (type === "reference" && reference) {
        if (reference._type !== "reference") {
            link = `${routes[reference._type] ? "/" + routes[reference._type] : ""}/${reference.slug?.current || ""}`;
            link = lang ? `/${lang}${link}` : link;
        }
    }

    link = link
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .replace(/\s+/g, "-");

    return link;
}

export function wrapReference(doc: PageDocument): LinkTyped {
    return {
        _type: "linkTyped",
        type: "reference",
        reference: doc
    };
}

export function linkPreview(link: LinkTyped): string {
    const route = link.reference?._type ? routes[link.reference._type as DocumentApp] : "";
    return link.type === "reference"
        ? `/${route ? route + "/" : ""}${link.reference?.slug?.current || ""}`
        : prepareLink(link);
}
