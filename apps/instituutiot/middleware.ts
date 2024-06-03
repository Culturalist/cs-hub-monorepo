import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { globalConfig, appName } from "@cs/globals";
import { clientNext } from "@cs/data/client";
import { langQuery } from "@cs/data/schemas";

const locales: string[] = globalConfig.localization.languages.map((l) => l.id);
const defaultLocale: string = globalConfig.localization.default;

async function filterActive(input: string[]): Promise<string[]> {
    const data: { languages?: string[] } | null = await clientNext.fetch(langQuery, {
        appName
    });
    return data?.languages || input;
}

async function getLocale(request: NextRequest): Promise<string | undefined> {
    // Negotiator expects plain object so we need to transform headers
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
    // Use negotiator and intl-localematcher to get best locale
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
    const active = await filterActive(locales);

    return matchLocale(languages, active, defaultLocale);
}

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    //Workaround to fix FB scraper failure
    // let isCrawler = false;
    // const headers = new Headers(request.headers);
    // if (headers.get("User-Agent")?.includes("facebookexternalhit")) {
    //     isCrawler = true;
    // }

    // if (isCrawler && request.headers.has("Range")) {
    //     headers.delete("Range");
    //     const response = NextResponse.next({ request: { headers } });
    //     return response;
    // }

    // Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = await getLocale(request);
        return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
    }
}

export const config = {
    matcher: [
        "/((?!api|admin|fonts|assets|_next/static|_ipx|_next/image|favicon.ico|apple-icon.png|icon.png|googlefea46182bb61c886.html).*)"
    ]
};
