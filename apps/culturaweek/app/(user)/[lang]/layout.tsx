import 'ui/globals.css';
import { App } from 'data/schemas';
import { DefaultLayoutProps } from 'globals';
import { clientNext } from 'globals/lib/sanity';
import { layoutQuery } from 'data/queries';
import app from '../../../app.json';
import { Header, Footer, ThemeInit, GoogleTag } from 'ui';
import { Suspense } from 'react';
import globalConfig from 'globals/globalConfig';
import NotFound from './not-found';

const { appName } = app;

export default async function RootLayout({ children, params }: DefaultLayoutProps) {
    const data: App = await clientNext.fetch(layoutQuery, { appName });
    const lang = data.languages?.includes(params.lang) ? params.lang : globalConfig.localization.default;

    if (!data)
        return (
            <html lang={lang} data-useragent="hhea">
                <body>
                    <main>{children}</main>
                </body>
            </html>
        );

    const showFooter = !data?.hero?.hideFooter;

    return (
        <html lang={lang} data-useragent="hhea">
            <GoogleTag appName={appName} />
            <body>
                <Suspense fallback={<></>}>
                    <ThemeInit />
                </Suspense>
                <Header data={data.header} languages={data.languages} title={data.title} lang={lang} />
                {data.languages?.includes(params.lang) ? children : <NotFound />}
                {showFooter && <Footer data={data.footer} lang={lang} />}
            </body>
        </html>
    );
}

// export const metadata = {
//     viewport: {
//         width: globalConfig.breakpoints.xs,
//         userScalable: false
//     }
// };
