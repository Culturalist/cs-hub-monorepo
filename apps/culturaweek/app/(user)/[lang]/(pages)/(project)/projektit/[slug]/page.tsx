import { Project as Data } from 'data/schemas';
import { getStaticParams, prepareMetadata } from 'data/utils';
import { DefaultPageProps } from 'globals';
import { clientNext } from 'globals/lib/sanity';
import { notFound } from 'next/navigation';
import { projectQuery } from 'data/queries';
import app from '../../../../../../../app.json';
import { Metadata } from 'next';
import { ProjectLayout } from 'ui';

const { appName } = app;

export const revalidate = 60;

export default async function Project({ params }: DefaultPageProps) {
    const { slug, lang } = params;
    const data: Data = await clientNext.fetch(projectQuery, { slug, appName });

    if (!data) {
        notFound();
    }

    return <ProjectLayout data={data} lang={lang} />;
}

export async function generateStaticParams() {
    return getStaticParams('project', appName);
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
    return prepareMetadata({ type: 'project', params, appName });
}
