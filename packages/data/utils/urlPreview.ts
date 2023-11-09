import { DocumentApp, routes } from "@cs/globals";

export function urlPreview(slug?: string, docType?: DocumentApp): string {
    if (!slug) return "";
    const folder = docType && routes[docType] ? "/" + routes[docType] : "";
    return `${folder}/${slug}`;
}
