import { Post as Data, postQuery } from 'data/schemas';
import { getStaticParams, prepareMetadata } from 'data/utils';
import { DefaultPageProps } from 'globals';
import { clientNext } from 'globals/lib/sanity';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { PostLayout } from 'ui';

export const revalidate = 60;

export default async function Post({ params }: DefaultPageProps) {
    const { slug, lang } = params;
    const data: Data = await clientNext.fetch(postQuery, { slug });

    if (!data) {
        notFound();
    }

    return <PostLayout data={data} lang={lang} />;
}

export async function generateStaticParams() {
    return getStaticParams('post');
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
    return prepareMetadata({ type: 'post', params });
}
