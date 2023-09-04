import { Note as Data } from 'data/schemas';
import { getStaticParams, prepareMetadata } from 'data/utils';
import { DefaultPageProps } from 'globals';
import { clientNext } from 'globals/lib/sanity';
import { notFound } from 'next/navigation';
import { noteQuery } from 'data/queries';
import app from '../../../../../../../app.json';
import { Metadata } from 'next';
import { NoteLayout } from 'ui';

const { appName } = app;

export const revalidate = 60;

export default async function Note({ params }: DefaultPageProps) {
    const { slug, lang } = params;
    const data: Data = await clientNext.fetch(noteQuery, { slug, appName });

    if (!data) {
        notFound();
    }

    return <NoteLayout data={data} lang={lang} />;
}

export async function generateStaticParams() {
    return getStaticParams('note', appName);
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
    return prepareMetadata({ type: 'note', params, appName });
}
