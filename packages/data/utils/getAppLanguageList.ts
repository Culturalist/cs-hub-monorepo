import globalConfig from 'globals/globalConfig';
import { ListItem } from 'globals';

export default function getAppLanguageList(): ListItem[] {
    let languageList: ListItem[] = [];
    globalConfig.localization.languages.forEach(languageItem => {
        if (languageItem) {
            languageList.push({
                value: languageItem.id,
                title: languageItem.title
            });
        }
    });
    return languageList;
}
