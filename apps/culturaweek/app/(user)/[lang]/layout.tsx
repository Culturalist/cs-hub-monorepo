import 'ui/globals.css';
import { App } from 'data/schemas';
import { DefaultLayoutProps } from 'globals';
import { clientNext } from 'globals/lib/sanity';
import { homeQuery } from './query';
import app from '../../../app.json';
import { Header, Footer, ThemeInit } from 'ui';
import { Suspense } from 'react';

const { appName } = app;

export default async function RootLayout({ children, params: { lang } }: DefaultLayoutProps) {
    const data: App = await clientNext.fetch(homeQuery, { appName });

    if (!data)
        return (
            <html lang={lang} data-useragent="hhea">
                <body>
                    <main>{children}</main>
                </body>
            </html>
        );

    return (
        <html lang={lang} data-useragent="hhea">
            <Suspense fallback={<></>}>
                <ThemeInit />
            </Suspense>
            <body>
                <Header data={data.header} title={data.title} lang={lang} />
                <main>{children}</main>
                <Footer data={data.footer} lang={lang} />
            </body>
        </html>
    );
}
