import { Metadata } from "next";
import Head from "next/head";
import { notFound } from "next/navigation";
import { Maket } from "@weresk/maket";
import { globalConfig, appName, DefaultPageProps } from "@cs/globals";
import { clientNext } from "@cs/data/client";
import { App, homeQuery } from "@cs/data/schemas";
import { prepareMetadata } from "@cs/data/utils";
import { Hero, Header, GoogleTag, Body } from "@cs/ui";

export const revalidate = 0;

export default async function Home() {
    const lang = globalConfig.localization.default;
    const data = await clientNext.fetch<App | null>(homeQuery, { appName });

    if (!data) return notFound();

    return (
        <Maket lang={lang}>
            <Head>
                <meta property="fb:app_id" content={globalConfig.tokens?.fbAppId || ""} />
            </Head>
            <body>
                <Header data={data.header} languages={data.languages} title={data.title} lang={lang} />
                <main>
                    <Hero data={data.hero} lang={lang} />
                    <Body data={data.body} lang={lang} />
                </main>
            </body>
            <GoogleTag />
        </Maket>
    );
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
    return prepareMetadata({ type: "app", params });
}
