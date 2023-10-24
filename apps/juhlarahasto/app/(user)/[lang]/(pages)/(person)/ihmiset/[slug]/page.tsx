import { notFound } from "next/navigation";
import { DefaultPageProps } from "@cs/globals";
import { clientNext } from "@cs/data/client";
import { Person as Data, personQuery } from "@cs/data/schemas";
import { getStaticParams, prepareMetadata } from "@cs/data/utils";
import { PersonLayout } from "@cs/ui";
import { Metadata } from "next";

export const revalidate = 60;

export default async function Person({ params }: DefaultPageProps) {
    const { slug, lang } = params;
    const data = await clientNext.fetch<Data | null>(personQuery, { slug });

    if (!data) {
        notFound();
    }

    return <PersonLayout data={data} lang={lang} />;
}

export async function generateStaticParams() {
    return getStaticParams("person");
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
    return prepareMetadata({ type: "person", params });
}
