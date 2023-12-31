import { notFound } from "next/navigation";
import { DefaultPageProps } from "@cs/globals";
import { clientNext } from "@cs/data/client";
import { Note as Data, noteQuery } from "@cs/data/schemas";
import { getStaticParams, prepareMetadata } from "@cs/data/utils";
import { NoteLayout } from "@cs/ui";
import { Metadata } from "next";

export const revalidate = 0;

export default async function Note({ params }: DefaultPageProps) {
    const { slug, lang } = params;
    const data = await clientNext.fetch<Data | null>(noteQuery, { slug });

    if (!data) {
        notFound();
    }

    return <NoteLayout data={data} lang={lang} />;
}

export async function generateStaticParams() {
    return getStaticParams("note");
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
    return prepareMetadata({ type: "note", params });
}
