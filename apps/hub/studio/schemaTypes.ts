import globalConfig from 'globals/globalConfig';
import { appName } from '../app.json';

//Locales
import { localeString, localeText } from 'data/schemas';

//Objects
import { globalSchemaTypes } from 'data/schemas';

//Documents
import { page, person } from 'data/schemas';

export const schemaTypes = [
    ...globalSchemaTypes,
    //Locales
    localeString(),
    localeText(),
    //Documents
    page(globalConfig.apps[appName].localization.default),
    person(globalConfig.apps[appName].localization.default)
];
