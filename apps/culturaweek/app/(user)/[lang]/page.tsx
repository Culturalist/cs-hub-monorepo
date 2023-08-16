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
            <div>
                <div className="h-20"></div>
                <h1 className="mt-32 ml-20 border border-blue w-fit">
                    <span className="typo-outlined trim-line">Media and trust</span>
                </h1>
                {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
            </div>
        </>
    );
}
