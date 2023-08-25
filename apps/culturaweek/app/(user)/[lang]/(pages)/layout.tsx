import { App } from 'data/schemas';
import { DefaultLayoutProps } from 'globals';
import { clientNext } from 'globals/lib/sanity';
import { homeQuery } from '../query';
import app from '../../../../app.json';
import { Footer } from 'ui';

const { appName } = app;

export default async function RootLayout({ children, params: { lang } }: DefaultLayoutProps) {
    const data: App = await clientNext.fetch(homeQuery, { appName });

    if (!data) return <main>{children}</main>;

    const showFooter = data?.hero?.hideFooter;

    return (
        <>
            <main>{children}</main>
            {showFooter && <Footer data={data.footer} lang={lang} />}
        </>
    );
}
