import globalConfig from 'globals/globalConfig';
import { Locale } from 'globals';

export default function hideLanguageField(lang: Locale, document?: any): boolean {
    return document?._type == 'app'
        ? //If document is 'app', check it's id
          globalConfig.apps[document._id.replace('drafts.', '')]
            ? //If app id is valid, check corresponding languages list from config
              !globalConfig.apps[document._id.replace('drafts.', '')].localization.languages.includes(lang)
            : //If app id is not valide, don't hide language
              false
        : //For rest of the documents check the 'app' field
        globalConfig.apps[document?.app?._ref || 'hub']
        ? //If app id is valid, check corresponding languages list from config
          !globalConfig.apps[document?.app?._ref || 'hub'].localization.languages.includes(lang)
        : //If app id is not valide, don't hide language
          false;
}
