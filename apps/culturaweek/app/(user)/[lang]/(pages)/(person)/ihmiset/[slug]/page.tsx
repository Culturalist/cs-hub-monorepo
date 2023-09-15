import { Person as Data, personQuery } from 'data/schemas';
import { getStaticParams, prepareMetadata } from 'data/utils';
import { DefaultPageProps } from 'globals';
import { clientNext } from 'globals/lib/sanity';
import { notFound } from 'next/navigation';
import app from '../../../../../../../app.json';
import { Metadata } from 'next';
import { PersonLayout } from 'ui';

const { appName } = app;

export const revalidate = 60;

export default async function Person({ params }: DefaultPageProps) {
    const { slug, lang } = params;
    const data: Data = await clientNext.fetch(personQuery, { slug, appName });

    if (!data) {
        notFound();
    }

    return <PersonLayout data={data} lang={lang} />;
}

export async function generateStaticParams() {
    return getStaticParams('person', appName);
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
    return prepareMetadata({ type: 'person', params, appName });
}
