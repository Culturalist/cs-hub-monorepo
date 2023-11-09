import { appName } from "../appsConfig";
import type { DocumentApp } from "../types";

export const desk: Record<string, Partial<Record<DocumentApp, { parentId: string; title: string }[]>>> = {
    culturas: {},
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
                title: "Apurahatarinat"
            }
        ],
        event: [],
        note: [],
        person: [],
        organisation: []
    }
};

export const appDesk = desk[appName] || {};
