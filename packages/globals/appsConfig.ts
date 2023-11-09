import { AppConfig } from "./types";

export const appName = process.env.NEXT_PUBLIC_APP_NAME || process.env.SANITY_STUDIO_APP_NAME || "template";

export const appsConfig: Record<string, AppConfig> = {
    hub: {
        title: "Cultura-säätiö Hub",
        schemas: {
            documents: ["page", "person", "post", "project", "event", "note", "organisation"],
            links: ["page", "person", "post", "project", "event", "note"],
            navigation: ["page", "project", "event"],
            create: ["page", "person", "post", "project", "event", "note", "label", "organisation"]
        }
    },
    culturas: {
        title: "Cultura-säätiö",
        schemas: {
            documents: ["page", "event", "person", "organisation"],
            links: ["page", "person", "event"],
            navigation: ["page", "event"],
            create: ["page", "person", "event", "label", "organisation", "palette"]
        },
        tokens: {
            googleTag: ""
        }
    },
    culturaweek: {
        title: "CulturaWeek",
        schemas: {
            documents: ["page", "event", "person", "organisation"],
            links: ["page", "person", "event"],
            navigation: ["page", "event"],
            create: ["page", "person", "event", "label", "organisation", "palette"]
        },
        tokens: {
            registration: "",
            googleTag: "G-L5CP6G9TYB"
        }
    },
    juhlarahasto: {
        title: "Juhlarahasto",
        schemas: {
            documents: ["page", "post", "event", "note", "person", "organisation"],
            links: ["page", "person", "post", "event"],
            navigation: ["page", "event"],
            create: ["page", "person", "post", "event", "label", "organisation", "note", "palette"]
        },
        parentDocuments: {
            post: "tarinat"
        },
        tokens: {
            googleTag: "G-580T1LN9R6"
        }
    }
};

export const appConfig = appsConfig[appName];
