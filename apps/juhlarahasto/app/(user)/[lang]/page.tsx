import { App, homeQuery } from 'data/schemas';
import { prepareMetadata } from 'data/utils';
import { appName, DefaultPageProps } from 'globals';
import { clientNext } from 'globals/lib/sanity';
import { getPageVariables, Hero } from 'ui';
import { Metadata } from 'next';

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

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
    return prepareMetadata({ type: 'app', params });
}
