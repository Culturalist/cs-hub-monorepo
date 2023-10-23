import { LanguageFilterConfig } from "@sanity/language-filter";
import { appConfig } from "../../appsConfig";
import { globalConfig } from "../../globalConfig";

export default function languageFilterConfig(): LanguageFilterConfig {
    return {
        supportedLanguages: globalConfig.localization.languages,
        defaultLanguages: [],
        documentTypes: [...appConfig.schemas.create, "app"],
        filterField: (enclosingType, field, selectedLanguageIds) =>
            !enclosingType.name.startsWith("locale") || selectedLanguageIds.includes(field.name)
    };
}
