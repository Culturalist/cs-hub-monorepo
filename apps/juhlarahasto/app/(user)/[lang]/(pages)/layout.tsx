import { App, layoutQuery } from 'data/schemas';
import { appName, DefaultLayoutProps } from 'globals';
import { clientNext } from 'globals/lib/sanity';
import { Footer } from 'ui';

export default async function RootLayout({ children, params: { lang } }: DefaultLayoutProps) {
    const data: App = await clientNext.fetch(layoutQuery, { appName });

    if (!data) return <main>{children}</main>;

    const showFooter = data?.hero?.hideFooter;

    return (
        <>
            {children}
            {showFooter && <Footer data={data.footer} lang={lang} />}
        </>
    );
}
