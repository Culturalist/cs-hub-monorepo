import { DefaultPageProps, DocumentApp, ImageObject, appName, globalConfig, appDomain, routes } from "@cs/globals";
import { clientNext, getImageUrlBuilder } from "@cs/globals/lib/sanity";
import { Metadata } from "next";
import { SanityDocument } from "sanity";
import { localizeString } from "./localizeString";
import { formatKeywords } from "@cs/globals/utils";
import { metadataAppQuery, metadataPageQuery } from "../schemas";
import type { App, CoverBlock, ElementDate, LineupPeople, LocaleString, MetadataPage } from "../schemas";

export interface MetadataAny extends SanityDocument {
    _type: DocumentApp;
    title?: LocaleString;
    subtitle?: LocaleString;
    position?: LocaleString;
    photo?: ImageObject;
    covers?: CoverBlock[];
    lineup?: LineupPeople[];
    dates?: ElementDate[];
    metadata?: MetadataPage;
}

export interface PrepareMetadataProps {
    type: DocumentApp;
    params: DefaultPageProps["params"];
}

export async function prepareMetadata({ type, params: { slug, lang } }: PrepareMetadataProps): Promise<Metadata> {
    const output: Metadata = {};
    const app = await clientNext.fetch<App | null>(metadataAppQuery, { appName });
    const languages = app?.languages || globalConfig.localization.languages.map((l) => l.id);
    const global = app ? app.metadata : undefined;
    const document: MetadataAny | undefined =
        type !== "app" && slug ? await clientNext.fetch(metadataPageQuery, { type, slug, appName }) : undefined;
    const metadata = document ? document.metadata : undefined;

    //Title ------
    const template = localizeString(global?.template, lang) || "%s";
    let title = localizeString(global?.title, lang) || localizeString(app?.title, lang) || "";
    const websiteName = localizeString(app?.title, lang) || title;
    if (type !== "app" && document) {
        // Page
        title = localizeString(document.title, lang) || title;

        //Metadata title
        title = localizeString(metadata?.title, lang) || title;

        title = template.replace("%s", title);
    }
    output.title = title;

    //Description
    let description = localizeString(global?.description, lang);
    if (type !== "app" && document) {
        //Metadata description
        description = localizeString(metadata?.description, lang) || description;
    }
    output.description = description;

    //Keywords
    let keywords = localizeString(global?.keywords, lang) || "";
    //Metadata keywords
    if (type !== "app" && localizeString(metadata?.keywords, lang)) {
        keywords = `${localizeString(metadata?.keywords, lang)}${keywords ? ", " + keywords : ""}`;
    }
    output.keywords = formatKeywords(keywords);

    //Video
    let videoUrl: string | undefined = global?.sharedVideo?.url;
    if (type !== "app") {
        videoUrl = metadata?.sharedVideo?.url;
    }
    let videoCover = Boolean(videoUrl);

    //Image
    let image: ImageObject | undefined = global?.sharedImage;
    if (type !== "app" && document) {
        // Photo
        if (document.photo?.asset) {
            image = document.photo;
        }

        //Covers
        if (document.covers && document.covers.length > 0) {
            document.covers.every((cover) => {
                if (cover._type === "coverImage" && cover.asset) {
                    image = cover;
                    if (cover.useMedia.includes("desktop")) {
                        videoCover = false;
                        return false;
                    }
                }
                return true;
            });
        }

        //Metadata sharedImage
        image = metadata?.sharedImage?.asset ? metadata.sharedImage : image;
    }
    const imageUrl: string | undefined = image
        ? getImageUrlBuilder(image).fit("max").width(1200).height(630).url()
        : undefined;

    //URL
    let path: string | undefined;
    if (type !== "app" && slug) {
        path = `${routes[type] ? routes[type] + "/" : ""}${slug}/`;
    }
    const url = path ? appDomain + path : appDomain;
    output.alternates = {
        canonical: url,
        languages: {
            "fi-FI": languages.includes("fi") ? `${appDomain}fi/${path || ""}` : undefined,
            "en-US": languages.includes("en") ? `${appDomain}en/${path || ""}` : undefined,
            "ru-RU": languages.includes("ru") ? `${appDomain}ru/${path || ""}` : undefined
        }
    };

    //Globals
    const organization = globalConfig.organization;
    output.authors = {
        name: organization
    };
    output.creator = globalConfig.creator;

    //Opengraph
    output.openGraph = {
        type: videoCover ? "video.other" : "website",
        title,
        description,
        url,
        siteName: websiteName,
        images: imageUrl
            ? [
                  {
                      url: imageUrl,
                      width: 1200,
                      height: 630,
                      alt: title
                  }
              ]
            : undefined,
        videos:
            videoCover && videoUrl
                ? [
                      {
                          url: videoUrl,
                          secureUrl: videoUrl,
                          type: "video/mp4",
                          width: 800,
                          height: 420
                      }
                  ]
                : undefined,
        locale: lang
    };

    //Twitter
    output.twitter = {
        card: "summary_large_image",
        title,
        description,
        site: organization,
        images: imageUrl ? [imageUrl] : undefined
    };

    //Robots
    output.robots =
        (type !== "app" && metadata?.preventIndexing) || type === "note"
            ? "noindex, nofollow"
            : "index, follow, max-image-preview:large";

    return output;
}
