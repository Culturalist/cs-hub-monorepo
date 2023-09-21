import { Note as Data, noteQuery } from 'data/schemas';
import { getStaticParams, prepareMetadata } from 'data/utils';
import { DefaultPageProps } from 'globals';
import { clientNext } from 'globals/lib/sanity';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { NoteLayout } from 'ui';

export const revalidate = 60;

export default async function Note({ params }: DefaultPageProps) {
    const { slug, lang } = params;
    const data: Data = await clientNext.fetch(noteQuery, { slug });

    if (!data) {
        notFound();
    }

    return <NoteLayout data={data} lang={lang} />;
}

export async function generateStaticParams() {
    return getStaticParams('note');
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
    return prepareMetadata({ type: 'note', params });
}
