import { Person as Data } from 'data/schemas';
import { getStaticParams } from 'data/utils';
import { DefaultPageProps } from 'globals';
import { clientNext } from 'globals/lib/sanity';
import { notFound } from 'next/navigation';
import { personQuery } from './query';
import app from '../../../../../../app.json';

const { appName } = app;

export const revalidate = 60;

export default async function Person({ params }: DefaultPageProps) {
    const { slug, lang } = params;
    const data: Data = await clientNext.fetch(personQuery, { slug, appName });

    if (!data) {
        notFound();
    }

    return (
        <main>
            <h1>Person</h1>
            <p>{lang}</p>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </main>
    );
}

export async function generateStaticParams() {
    return getStaticParams('person', appName);
}

// export async function generateMetadata({ params }: DefaultPageProps): Promise<MetadataPage> {
//     return prepareMetadata({ type: 'page', params });
// }
