import { GlobalConfig } from "./types";

export const globalConfig: GlobalConfig = {
    localization: {
        languages: [
            {
                id: "fi",
                title: "Suomi",
                abbr: "su"
            },
            {
                id: "en",
                title: "English",
                abbr: "en"
            },
            {
                id: "ru",
                title: "Русский",
                abbr: "ru"
            }
        ],
        default: "fi",
        safeReplace: true
    },
    latestUpdate: "2023-10-05",
    organization: "Cultura-säätiö",
    creator: "Alexander Kalachev <alexanderkalachev.com>",
    tokens: {
        fbAppId: "1109207817140829"
    },
    debug: true
};
