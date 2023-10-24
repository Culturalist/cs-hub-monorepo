import { DefaultPageProps, globalConfig } from "@cs/globals";
import { groq } from "next-sanity";
import { clientNext } from "../client";

type Param = Partial<DefaultPageProps["params"]>;

export async function getStaticParams(docType: string): Promise<Param[]> {
    let params: Param[] = [];

    const pages: Param[] = await clientNext.fetch(groq`*[_type == $docType]{'slug': slug.current}`, { docType });
    params = [...pages];

    const localeParams: Param[] = [];
    globalConfig.localization.languages.forEach((language) => {
        params.forEach((param) => {
            localeParams.push({ ...param, lang: language.id });
        });
    });
    params = [...localeParams];

    return params;
}
