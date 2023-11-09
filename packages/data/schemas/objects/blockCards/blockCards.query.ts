import { globalConfig } from "@cs/globals";
import { groq } from "next-sanity";

export const blockCardsQuery = groq`*[_type == $docType && (dateTime(publishDate) < dateTime(now()) || !defined(publishDate))] | order(publishDate desc, title.${globalConfig.localization.default} asc){
    ...,
    labels[]->,
    author->
}`;
