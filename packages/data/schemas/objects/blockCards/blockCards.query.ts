import globalConfig from 'globals/globalConfig';
import { groq } from 'next-sanity';

export const blockCardsQuery = groq`*[_type == $docType] | order(date desc, title.${globalConfig.localization.default} asc){
    ...,
    labels[]->,
    author->
}`;
