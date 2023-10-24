import { notFound } from "next/navigation";
import { DefaultPageProps } from "@cs/globals";
import { clientNext } from "@cs/data/client";
import { Post as Data, postQuery } from "@cs/data/schemas";
import { getStaticParams, prepareMetadata } from "@cs/data/utils";
import { PostLayout } from "@cs/ui";
import { Metadata } from "next";

export const revalidate = 60;

export default async function Post({ params }: DefaultPageProps) {
    const { slug, lang } = params;
    const data = await clientNext.fetch<Data | null>(postQuery, { slug });

    if (!data) {
        notFound();
    }

    return <PostLayout data={data} lang={lang} />;
}

export async function generateStaticParams() {
    return getStaticParams("post");
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
    return prepareMetadata({ type: "post", params });
}
