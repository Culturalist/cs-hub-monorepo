import { DefaultPageProps } from 'globals';
import { groq } from 'next-sanity';
import { clientNext } from 'globals/lib/sanity';
import globalConfig from 'globals/globalConfig';

type Param = Partial<DefaultPageProps['params']>;

export async function getStaticParams(docType: string, appName: string): Promise<Param[]> {
    let params: Param[] = [];

    const pages: Param[] = await clientNext.fetch(
        groq`*[_type == $docType && app._ref == $appName]{'slug': slug.current}`,
        { docType, appName }
    );
    params = [...pages];

    let localeParams: Param[] = [];
    globalConfig.localization.languages.forEach(language => {
        params.forEach(param => {
            localeParams.push({ ...param, lang: language.id });
        });
    });
    params = [...localeParams];

    return params;
}
