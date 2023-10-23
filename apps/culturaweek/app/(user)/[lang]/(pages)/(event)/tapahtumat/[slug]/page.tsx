import { notFound } from "next/navigation";
import { DefaultPageProps } from "@cs/globals";
import { clientNext } from "@cs/data/client";
import { Event as Data, eventQuery } from "@cs/data/schemas";
import { getStaticParams, prepareMetadata } from "@cs/data/utils";
import { EventLayout } from "@cs/ui";

export const revalidate = 60;

export default async function Event({ params }: DefaultPageProps) {
    const { slug, lang } = params;
    const data = await clientNext.fetch<Data | null>(eventQuery, { slug });

    if (!data) {
        notFound();
    }

    return <EventLayout data={data} lang={lang} />;
}

export async function generateStaticParams() {
    return getStaticParams("event");
}

export async function generateMetadata({ params }: DefaultPageProps) {
    return prepareMetadata({ type: "event", params });
}
