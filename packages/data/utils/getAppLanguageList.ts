import globalConfig from 'globals/globalConfig';
import { ListItem } from 'globals';

export default function getAppLanguageList(appName: string): ListItem[] {
    let languageList: ListItem[] = [];
    globalConfig.apps[appName].localization.languages.forEach(langId => {
        const languageItem = globalConfig.localization.languages.find(({ id }) => id === langId);
        if (languageItem) {
            languageList.push({
                value: languageItem.id,
                title: languageItem.title
            });
        }
    });
    return languageList;
}
