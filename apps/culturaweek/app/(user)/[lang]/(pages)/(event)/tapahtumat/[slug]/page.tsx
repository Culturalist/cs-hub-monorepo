import { Event as Data, eventQuery } from 'data/schemas';
import { getStaticParams, prepareMetadata } from 'data/utils';
import { DefaultPageProps } from 'globals';
import { clientNext } from 'globals/lib/sanity';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { EventLayout } from 'ui';

export const revalidate = 60;

export default async function Event({ params }: DefaultPageProps) {
    const { slug, lang } = params;
    const data: Data = await clientNext.fetch(eventQuery, { slug });

    if (!data) {
        notFound();
    }

    return <EventLayout data={data} lang={lang} />;
}

export async function generateStaticParams() {
    return getStaticParams('event');
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
    return prepareMetadata({ type: 'event', params });
}
