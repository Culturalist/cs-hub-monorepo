import { Event as Data } from 'data/schemas';
import { getStaticParams, prepareMetadata } from 'data/utils';
import { DefaultPageProps } from 'globals';
import { clientNext } from 'globals/lib/sanity';
import { notFound } from 'next/navigation';
import { eventQuery } from 'data/queries';
import app from '../../../../../../../app.json';
import { Metadata } from 'next';

const { appName } = app;

export const revalidate = 60;

export default async function Event({ params }: DefaultPageProps) {
    const { slug, lang } = params;
    const data: Data = await clientNext.fetch(eventQuery, { slug, appName });

    if (!data) {
        notFound();
    }

    return (
        <main>
            <h1>Event</h1>
            <p>{lang}</p>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </main>
    );
}

export async function generateStaticParams() {
    return getStaticParams('event', appName);
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
    return prepareMetadata({ type: 'event', params, appName });
}
