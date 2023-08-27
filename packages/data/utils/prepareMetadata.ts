import { DefaultPageProps, FileObject, ImageObject } from 'globals';
import globalConfig from 'globals/globalConfig';
import { clientNext, getImageUrlBuilder } from 'globals/lib/sanity';
import { Metadata } from 'next';
import { SanityDocument } from 'sanity';
import { formatKeywords, localizeString } from 'weresk';
import { metadataAppQuery, metadataPageQuery } from '../queries';
import { App, CoverBlock, DocumentApp, ElementDate, ElementLineup, LocaleString, MetadataPage } from '../schemas';

export interface MetadataAny extends SanityDocument {
    _type: DocumentApp;
    title?: LocaleString;
    subtitle?: LocaleString;
    position?: LocaleString;
    covers?: CoverBlock[];
    lineup?: ElementLineup[];
    dates?: ElementDate[];
    metadata?: MetadataPage;
}

export interface prepareMetadataProps {
    type: DocumentApp;
    params: DefaultPageProps['params'];
    appName: string;
}

export async function prepareMetadata({
    type,
    params: { slug, lang },
    appName = 'hub'
}: prepareMetadataProps): Promise<Metadata> {
    const output: Metadata = {};
    // const dictionary: Dictionary = await client.fetch(dictionaryQuery);
    const app: App = await clientNext.fetch(metadataAppQuery, { appName });
    const languages = app?.languages || globalConfig.localization.languages.map(lang => lang.id);
    const global = app ? app.metadata : undefined;
    const document: MetadataAny | undefined =
        type !== 'app' && slug ? await clientNext.fetch(metadataPageQuery, { type, slug, appName }) : undefined;
    const metadata = document ? document.metadata : undefined;

    //Title ------
    const template = localizeString(global?.template, lang) || '%s';
    let title = localizeString(global?.title, lang) || localizeString(app.title, lang) || '';
    if (type !== 'app' && document) {
        //Event
        if (type == 'event') {
            title =
                `${localizeString(document.title, lang)}${
                    localizeString(document.subtitle, lang) ? ' – ' + localizeString(document.subtitle, lang) : ''
                }` || title;
        } else {
            // Page
            title = localizeString(document.title, lang) || title;
        }

        //Metadata title
        title = localizeString(metadata?.title, lang) || title;

        title = template.replace('%s', title);
    }
    output.title = title;

    //Description
    let description = localizeString(global?.description, lang);
    if (type !== 'app' && document) {
        //Metadata description
        description = localizeString(metadata?.description, lang) || description;
    }
    output.description = description;

    //Keywords
    let keywords = localizeString(global?.keywords, lang) || '';
    //Metadata keywords
    if (type !== 'app' && localizeString(metadata?.keywords, lang)) {
        keywords = `${localizeString(metadata?.keywords, lang)}${keywords ? ', ' + keywords : ''}`;
    }
    output.keywords = formatKeywords(keywords);

    //Image
    let image: ImageObject | undefined = global?.sharedImage;
    if (type !== 'app' && document) {
        //Covers
        if (document.covers && document.covers.length > 0) {
            document.covers.every(cover => {
                if (cover._type == 'coverImage' && cover.asset) {
                    image = cover;
                    if (cover.useMedia?.includes('desktop')) {
                        return false;
                    }
                }
                return true;
            });
        }
        //Metadata sharedImage
        if (metadata && metadata.sharedImage?.asset) {
            image = metadata?.sharedImage.asset ? metadata.sharedImage : image;
        }
    }
    const imageUrl: string | undefined = image
        ? getImageUrlBuilder(image).fit('max').width(1200).height(630).url()
        : undefined;

    //Video
    let videoUrl: string | undefined = global?.sharedVideo?.url;
    if (type !== 'app' && metadata?.sharedVideo?.url) {
        videoUrl = metadata.sharedVideo.url;
    }

    //URL
    let path: string | undefined;
    if (type !== 'app' && slug) {
        path = `${globalConfig.routes[type] ? globalConfig.routes[type] : ''}${slug}/`;
    }
    const url = path ? globalConfig.apps[appName].domain + path : globalConfig.apps[appName].domain;
    output.alternates = {
        canonical: url,
        languages: {
            'fi-FI': languages.includes('fi') ? `${globalConfig.apps[appName].domain}fi/${path || ''}` : undefined,
            'en-US': languages.includes('en') ? `${globalConfig.apps[appName].domain}en/${path || ''}` : undefined,
            'ru-RU': languages.includes('ru') ? `${globalConfig.apps[appName].domain}ru/${path || ''}` : undefined
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
        type: videoUrl ? 'video.other' : 'website',
        title: title,
        description: description,
        url: url,
        siteName: organization,
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
        videos: videoUrl
            ? [
                  {
                      url: videoUrl,
                      width: 800,
                      height: 420
                  }
              ]
            : undefined,
        locale: lang
    };

    //Twitter
    output.twitter = {
        card: 'summary_large_image',
        title: title,
        description: description,
        site: organization,
        images: imageUrl ? [imageUrl] : undefined
    };

    //Robots
    output.robots =
        (type !== 'app' && metadata?.preventIndexing) || type === 'note'
            ? 'noindex, nofollow'
            : 'index, follow, max-image-preview:large';

    //Icons
    output.icons = {
        icon: '/favicon.ico'
    };

    //Viewport no zoom
    output.viewport = {
        width: globalConfig.breakpoints.xs,
        userScalable: false
    };

    return output;
}
