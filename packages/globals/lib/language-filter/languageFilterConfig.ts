import globalConfig from '../../globalConfig';
import { LanguageFilterConfig } from '@sanity/language-filter';

export default function languageFilterConfig(appName: string): LanguageFilterConfig {
    return {
        supportedLanguages: globalConfig.localization.languages,
        defaultLanguages: [],
        documentTypes: [...globalConfig.apps[appName].schemas.documents, 'app'],
        filterField: (enclosingType, field, selectedLanguageIds) =>
            !enclosingType.name.startsWith('locale') || selectedLanguageIds.includes(field.name)
    };
}
