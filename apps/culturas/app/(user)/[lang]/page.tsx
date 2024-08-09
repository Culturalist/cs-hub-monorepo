import { notFound } from "next/navigation";
import { appName, DefaultPageProps } from "@cs/globals";
import { clientNext } from "@cs/data/client";
import { App, homeQuery } from "@cs/data/schemas";
import { prepareMetadata } from "@cs/data/utils";
import { Body, Hero } from "@cs/ui";
import { Metadata } from "next";

export const revalidate = 0;

export default async function Home({ params: { lang } }: DefaultPageProps) {
    const data: App | null = await clientNext.fetch(homeQuery, { appName });

    if (!data) return notFound();

    return (
        // <>
        <main>
            <Hero data={data.hero} lang={lang} />
            <Body data={data.body} lang={lang} />
        </main>
        // </>
    );
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
    return prepareMetadata({ type: "app", params });
}
