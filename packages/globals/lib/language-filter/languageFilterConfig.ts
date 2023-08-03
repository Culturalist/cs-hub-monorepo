import globalConfig from '../../globalConfig';
import { LanguageFilterConfig } from '@sanity/language-filter';

export default function languageFilterConfig(appName: string): LanguageFilterConfig {
    return {
        supportedLanguages: globalConfig.apps[appName]
            ? globalConfig.apps[appName].localization.languages.map(
                  langId =>
                      globalConfig.localization.languages.find(({ id }) => id === langId) || {
                          id: 'en',
                          title: 'English'
                      }
              )
            : globalConfig.localization.languages.map(lang => lang || { id: 'en', title: 'English' }),
        defaultLanguages: [],
        documentTypes: [...globalConfig.apps[appName].schemas.documents, 'app'],
        filterField: (enclosingType, field, selectedLanguageIds) =>
            !enclosingType.name.startsWith('locale') || selectedLanguageIds.includes(field.name)
    };
}
