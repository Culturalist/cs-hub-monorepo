import { App } from 'data';
import { DefaultPageProps } from 'globals';
import { clientNext } from 'globals/lib/sanity';
import app from '../../../app.json';
import { homeQuery } from './query';

const { appName } = app;

export default async function Home({ params: { lang } }: DefaultPageProps) {
    const data: App = await clientNext.fetch(homeQuery, { appName });
    return (
        <>
            <br />
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        </>
    );
}
