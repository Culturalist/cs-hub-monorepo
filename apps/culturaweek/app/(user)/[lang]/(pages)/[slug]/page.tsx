import { Page as Data } from 'data/schemas';
import { getStaticParams } from 'data/utils';
import { DefaultPageProps } from 'globals';
import { clientNext } from 'globals/lib/sanity';
import { notFound } from 'next/navigation';
import { pageQuery } from './query';
import app from '../../../../../app.json';

const { appName } = app;

export const revalidate = 60;

export default async function Page({ params }: DefaultPageProps) {
    const { slug, lang } = params;
    const data: Data = await clientNext.fetch(pageQuery, { slug, appName });

    if (!data) {
        notFound();
    }

    return (
        <main>
            <h1>Page</h1>
            <p>{lang}</p>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </main>
    );
}

export async function generateStaticParams() {
    return getStaticParams('page', appName);
}

// export async function generateMetadata({ params }: DefaultPageProps): Promise<MetadataPage> {
//     return prepareMetadata({ type: 'page', params });
// }
