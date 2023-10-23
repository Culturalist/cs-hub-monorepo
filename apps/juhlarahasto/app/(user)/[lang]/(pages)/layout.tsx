import { appName, DefaultLayoutProps } from "@cs/globals";
import { clientNext } from "@cs/data/client";
import { App, layoutQuery } from "@cs/data/schemas";
import { Footer } from "@cs/ui";

export default async function RootLayout({ children, params: { lang } }: DefaultLayoutProps) {
    const data = await clientNext.fetch<App | null>(layoutQuery, { appName });

    if (!data) return <main>{children}</main>;

    const showFooter = data.hero?.hideFooter;

    return (
        <>
            {children}
            {showFooter ? <Footer data={data.footer} lang={lang} /> : null}
        </>
    );
}
