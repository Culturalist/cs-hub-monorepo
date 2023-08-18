import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import globalConfig from 'globals/globalConfig';
import app from './app.json';

const { appName } = app;

// @ts-ignore locales are readonly
const locales: string[] = globalConfig.apps[appName].localization.languages;
const defaultLocale: string = globalConfig.apps[appName].localization.default;

function getLocale(request: NextRequest): string | undefined {
    // Negotiator expects plain object so we need to transform headers
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
    // Use negotiator and intl-localematcher to get best locale
    let languages = new Negotiator({ headers: negotiatorHeaders }).languages();

    return matchLocale(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = locales.every(
        locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);
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
    matcher: ['/((?!api|admin|fonts|assets|_next/static|_ipx|_next/image|favicon.ico).*)']
};
