import { App } from 'data';
import { DefaultPageProps } from 'globals';
import { clientNext } from 'globals/lib/sanity';
import { getPageVariables, Hero } from 'ui';
import app from '../../../app.json';
import { homeQuery } from './query';

const { appName } = app;

export default async function Home({ params: { lang } }: DefaultPageProps) {
    const data: App = await clientNext.fetch(homeQuery, { appName });

    if (!data) return <></>;

    return (
        <>
            <main>
                <Hero data={data.hero} lang={lang} />
                {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
            </main>
            <style>{getPageVariables(data.theme)}</style>
        </>
    );
}
