import { notFound } from "next/navigation";
import { DefaultPageProps } from "@cs/globals";
import { clientNext } from "@cs/data/client";
import { Page as Data, pageQuery } from "@cs/data/schemas";
import { getStaticParams, prepareMetadata } from "@cs/data/utils";
import { PageLayout } from "@cs/ui";

export const revalidate = 60;

export default async function Page({ params }: DefaultPageProps) {
    const { slug, lang } = params;
    const data = await clientNext.fetch<Data | null>(pageQuery, { slug });

    if (!data) {
        notFound();
    }

    return <PageLayout data={data} lang={lang} />;
}

export async function generateStaticParams() {
    return getStaticParams("page");
}

export async function generateMetadata({ params }: DefaultPageProps) {
    return prepareMetadata({ type: "page", params });
}
