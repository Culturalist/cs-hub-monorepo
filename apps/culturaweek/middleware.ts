import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import globalConfig from 'globals/globalConfig';
import app from './app.json';
import { clientNext } from 'globals/lib/sanity';
import { langQuery } from 'data/queries';

const { appName } = app;

// @ts-ignore locales are readonly
const locales: string[] = globalConfig.localization.languages.map(l => l.id);
const defaultLocale: string = globalConfig.localization.default;

async function filterActive(input: string[]): Promise<string[]> {
    const data: { languages?: string[] } = await clientNext.fetch(langQuery, { appName });
    return data?.languages || input;
}

async function getLocale(request: NextRequest): Promise<string | undefined> {
    // Negotiator expects plain object so we need to transform headers
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
    // Use negotiator and intl-localematcher to get best locale
    let languages = new Negotiator({ headers: negotiatorHeaders }).languages();
    const active = await filterActive(locales);

    return matchLocale(languages, active, defaultLocale);
}

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const headers = new Headers(request.headers);

    //Workaround to fix FB scraper failure
    let isCrawler = false;
    //@ts-ignore
    for (const value of request.headers.values()) {
        if (value.includes('facebook')) {
            isCrawler = true;
        }
    }
    if (isCrawler /* && request.headers.has('Range')*/) {
        // return NextResponse.redirect(new URL(pathname, request.url));
        // const headers = new Headers(request.headers);
        // headers.delete('Range');
        // const response = NextResponse.next({ request: { headers } });
        return NextResponse.next({ request: { headers } });
    }

    // Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = locales.every(
        locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = await getLocale(request);
        return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
    }
}

export const config = {
    // // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
    // // If you have one
    // if (
    //   [
    //     '/manifest.json',
    //     '/favicon.ico',
    //     // Your other files in `public`
    //   ].includes(pathname)
    // )
    //   return
    matcher: ['/((?!api|admin|fonts|assets|_next/static|_ipx|_next/image|favicon.ico|apple-icon.png|icon.png).*)']
};
