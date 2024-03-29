import { appName } from "../appsConfig";
import type { DocumentApp } from "../types";

export const desk: Record<string, Partial<Record<DocumentApp, { parentId: string; title: string }[]>>> = {
    culturas: {
        page: [],
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
        project: [],
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
