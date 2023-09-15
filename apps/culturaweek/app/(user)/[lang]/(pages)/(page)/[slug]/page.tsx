import { Page as Data, pageQuery } from 'data/schemas';
import { getStaticParams, prepareMetadata } from 'data/utils';
import { DefaultPageProps } from 'globals';
import { clientNext } from 'globals/lib/sanity';
import { notFound } from 'next/navigation';
import app from '../../../../../../app.json';
import { PageLayout } from 'ui';
import { Metadata } from 'next';

const { appName } = app;

export const revalidate = 60;

export default async function Page({ params }: DefaultPageProps) {
    const { slug, lang } = params;
    const data: Data = await clientNext.fetch(pageQuery, { slug, appName });

    if (!data) {
        notFound();
    }

    return <PageLayout data={data} lang={lang} />;
}

export async function generateStaticParams() {
    return getStaticParams('page', appName);
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
    return prepareMetadata({ type: 'page', params, appName });
}
