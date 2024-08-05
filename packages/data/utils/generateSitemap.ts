import { groq } from "next-sanity";
import { Slug } from "@sanity/types";
import { DocumentApp, Locale } from "@cs/globals";
import { clientNext } from "../client";
import { MetadataPage } from "../schemas";

export type ChangeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

export interface SitemapFile {
    url: string;
    lastModified?: string | Date;
    changeFrequency?: ChangeFrequency;
    priority?: number;
    alternates?: { languages: Partial<Record<Locale, string>> };
}

export interface SitemapData {
    languages?: string[];
    documents?: {
        _type: DocumentApp;
        slug: Slug;
        metadata?: MetadataPage;
    }[];
}

const sitemapQuery = groq`{
    "languages": *[_type == 'app' && _id == $appName][0].languages,
    "documents": *[_type in $docTypes && (dateTime(publishDate) < dateTime(now()) || !defined(publishDate))]{
        _type,
        slug,
        metadata
    }
}`;

export const changeFrequency: Record<DocumentApp, ChangeFrequency> = {
    app: "weekly",
    project: "weekly",
    report: "weekly",
    page: "weekly",
    post: "weekly",
    event: "daily",
    person: "monthly",
    note: "never",
    organisation: "never"
};

export const priorities = {
    app: 1,
    project: 1,
    report: 1,
    page: 0.9,
    post: 1,
    event: 1,
    person: 0.5,
    note: 0,
    organisation: 0
};

export async function generateSitemap(
    appName: string,
    domain: string,
    routes: Record<string, string>,
    docTypes: DocumentApp[]
): Promise<SitemapFile[]> {
    const sitemap: SitemapFile[] = [];
    const baseUrl = domain.slice(0, -1);
    const data = await clientNext.fetch<SitemapData | null>(sitemapQuery, { appName, docTypes });

    // Home
    sitemap.push({
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 1,
        alternates: data?.languages
            ? { languages: Object.fromEntries(data.languages.map((lang) => [lang, `${baseUrl}/${lang}`])) }
            : undefined
    });

    // Documents
    data?.documents?.forEach((doc) => {
        if ((!doc.metadata || !doc.metadata.preventIndexing) && priorities[doc._type]) {
            sitemap.push({
                url: `${baseUrl}/${routes[doc._type] ? routes[doc._type] + "/" : ""}${doc.slug.current}`,
                lastModified: new Date(),
                changeFrequency: changeFrequency[doc._type],
                priority: priorities[doc._type],
                alternates: data.languages
                    ? {
                          languages: Object.fromEntries(
                              data.languages.map((lang) => [
                                  lang,
                                  `${baseUrl}/${lang}/${routes[doc._type] ? routes[doc._type] + "/" : ""}${
                                      doc.slug.current
                                  }`
                              ])
                          )
                      }
                    : undefined
            });
        }
    });
    return sitemap;
}
