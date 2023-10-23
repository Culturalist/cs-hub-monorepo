import { notFound } from "next/navigation";
import { appName, DefaultPageProps } from "@cs/globals";
import { clientNext } from "@cs/data/client";
import { App, homeQuery } from "@cs/data/schemas";
import { prepareMetadata } from "@cs/data/utils";
import { Hero } from "@cs/ui";

export const revalidate = 60;

export default async function Home({ params: { lang } }: DefaultPageProps) {
    const data: App | null = await clientNext.fetch(homeQuery, { appName });

    if (!data) return notFound();

    return (
        // <>
        <main>
            <Hero data={data.hero} lang={lang} />
        </main>
        // </>
    );
}

export async function generateMetadata({ params }: DefaultPageProps) {
    return prepareMetadata({ type: "app", params });
}
