import { App } from 'data/schemas';
import { prepareMetadata } from 'data/utils';
import { DefaultPageProps } from 'globals';
import { clientNext } from 'globals/lib/sanity';
import { Hero, Header, GoogleTag } from 'ui';
import app from '../../app.json';
import { homeQuery } from 'data/queries';
import { Metadata } from 'next';
import globalConfig from 'globals/globalConfig';
import { Suspense } from 'react';

const { appName } = app;

export default async function Home() {
    const lang = globalConfig.localization.default;
    const data: App = await clientNext.fetch(homeQuery, { appName });

    if (!data) return <></>;

    return (
        <html lang={lang} data-useragent="hhea">
            <head>
                <meta property="fb:app_id" content={globalConfig.tokens.fbAppId || ''} />
            </head>
            <body>
                <Suspense fallback={<></>}>
                    <GoogleTag appName={appName} />
                </Suspense>
                <Header data={data.header} languages={data.languages} title={data.title} lang={lang} />
                <main>
                    <Hero data={data.hero} lang={lang} />
                </main>
            </body>
        </html>
    );
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
    return prepareMetadata({ type: 'app', params, appName });
}
