import "@cs/ui/globals.css";
import Head from "next/head";
import { Maket, SetPalette } from "@weresk/maket";
import { globalConfig, appName, DefaultLayoutProps } from "@cs/globals";
import { App, layoutQuery } from "@cs/data/schemas";
import { clientNext } from "@cs/data/client";
import { Header, Footer, GoogleTag } from "@cs/ui";
import NotFound from "./not-found";

export default async function RootLayout({ children, params }: DefaultLayoutProps) {
    const data = await clientNext.fetch<App | null>(layoutQuery, { appName });
    const lang = data?.languages?.includes(params.lang) ? params.lang : globalConfig.localization.default;

    if (!data)
        return (
            <Maket lang={lang}>
                <body>
                    <main>{children}</main>
                </body>
            </Maket>
        );

    const showFooter = !data.hero?.hideFooter;

    return (
        <Maket lang={lang}>
            <Head>
                <meta property="fb:app_id" content={globalConfig.tokens?.fbAppId || ""} />
            </Head>
            <body className="">
                <Header data={data.header} languages={data.languages} title={data.title} lang={lang} />
                {data.languages?.includes(params.lang) ? children : <NotFound />}
                {showFooter ? <Footer data={data.footer} lang={lang} /> : null}
                <Maket.Grid />
                <SetPalette set={data.palette}>
                    {data.palette?.on_surface
                        ? `header { --header-logo-lightness: ${data.palette.on_surface.hsl.l} } footer { --footer-logo-lightness: ${data.palette.on_surface_light.hsl.l} }`
                        : undefined}
                </SetPalette>
            </body>
            <GoogleTag />
        </Maket>
    );
}
