import { globalConfig, ListItem } from "@cs/globals";

export function getAppLanguageList(): ListItem[] {
    let languageList: ListItem[] = [];
    globalConfig.localization.languages.forEach((languageItem) => {
        if (languageItem) {
            languageList.push({
                value: languageItem.id,
                title: languageItem.title
            });
        }
    });
    return languageList;
}
