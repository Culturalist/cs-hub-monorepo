import 'ui/globals.css';
import { App } from 'data';
import { DefaultLayoutProps } from 'globals';
import { clientNext } from 'globals/lib/sanity';
import { homeQuery } from './query';
import app from '../../../app.json';
import { Header, Footer, ThemeInit } from 'ui';

const { appName } = app;

export default async function RootLayout({ children, params: { lang } }: DefaultLayoutProps) {
    const data: App = await clientNext.fetch(homeQuery, { appName });
    return (
        <html lang={lang} data-useragent="hhea">
            <body>
                <ThemeInit />
                {/* <Header data={data.header} lang={lang} /> */}
                <main>{children}</main>
                <Footer data={data.footer} lang={lang} />
            </body>
        </html>
    );
}
