import { notFound } from "next/navigation";
import { DefaultPageProps } from "@cs/globals";
import { clientNext } from "@cs/data/client";
import { Report as Data, reportQuery } from "@cs/data/schemas";
import { getStaticParams, prepareMetadata } from "@cs/data/utils";
import { ReportLayout } from "@cs/ui";
import { Metadata } from "next";

export const revalidate = 0;

export default async function Report({ params }: DefaultPageProps) {
    const { slug, lang } = params;
    const data = await clientNext.fetch<Data | null>(reportQuery, { slug });

    if (!data) {
        notFound();
    }

    return <ReportLayout data={data} lang={lang} />;
}

export async function generateStaticParams() {
    return getStaticParams("report");
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
    return prepareMetadata({ type: "report", params });
}
