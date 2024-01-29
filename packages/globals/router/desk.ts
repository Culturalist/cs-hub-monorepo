import { appName } from "../appsConfig";
import type { DocumentApp } from "../types";

export const desk: Record<string, Partial<Record<DocumentApp, { parentId: string; title: string }[]>>> = {
    culturas: {
        page: [],
        project: [
            {
                parentId: "hankeemme",
                title: "Projects"
            }
        ],
        post: [
            {
                parentId: "blogi",
                title: "Blog"
            },
            {
                parentId: "uutiset",
                title: "News"
            }
        ],
        event: [],
        note: [],
        person: [],
        organisation: []
    },
    culturaweek: {
        page: [],
        event: [],
        person: [],
        organisation: []
    },
    juhlarahasto: {
        page: [],
        post: [
            {
                parentId: "tarinat",
                title: "Stories"
            }
        ],
        event: [],
        note: [],
        person: [],
        organisation: []
    },
    instituutiot: {
        page: [],
        project: [],
        event: [],
        person: [],
        organisation: []
    },
    venajankieliset: {
        page: [],
        project: [
            {
                parentId: "projektimme",
                title: "Projects"
            }
        ],
        event: [],
        person: [],
        organisation: []
    },
    tieto: {
        page: [],
        report: [],
        person: [],
        organisation: []
    }
};

export const appDesk = desk[appName] || {};
