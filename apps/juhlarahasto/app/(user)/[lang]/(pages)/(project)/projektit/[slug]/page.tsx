import { notFound } from "next/navigation";
import { DefaultPageProps } from "@cs/globals";
import { clientNext } from "@cs/data/client";
import { Project as Data, projectQuery } from "@cs/data/schemas";
import { getStaticParams, prepareMetadata } from "@cs/data/utils";
import { ProjectLayout } from "@cs/ui";

export const revalidate = 60;

export default async function Project({ params }: DefaultPageProps) {
    const { slug, lang } = params;
    const data = await clientNext.fetch<Data | null>(projectQuery, { slug });

    if (!data) {
        notFound();
    }

    return <ProjectLayout data={data} lang={lang} />;
}

export async function generateStaticParams() {
    return getStaticParams("project");
}

export async function generateMetadata({ params }: DefaultPageProps) {
    return prepareMetadata({ type: "project", params });
}
