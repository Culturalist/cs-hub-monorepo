import { globalConfig } from "@cs/globals";

export const getAppLanguageList = () =>
    globalConfig.localization.languages.map((languageItem) => ({
        value: languageItem.id,
        title: languageItem.title
    }));
